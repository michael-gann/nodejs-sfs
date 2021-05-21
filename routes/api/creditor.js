const router = require("express").Router();
const { Op, Sequelize } = require("sequelize");

const { Creditor, Creditor_Debtor, Debtor } = require("../../db/models");
const { findOrCreateDebtor, findOrCreateCreditor } = require("../utils");

const asyncHandler = require("express-async-handler");
const { parse } = require("dotenv");

// Get all creditors balance and average min payment percentage
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const creditorInfo = (
      await Creditor.findAll({
        attributes: ["id", "institution"],
        include: [
          {
            model: Creditor_Debtor,
            include: [
              {
                model: Debtor,
                attributes: ["id", "firstName", "lastName"],
              },
            ],
            attributes: [
              "creditorId",
              "debtorId",
              "balance",
              "minPaymentPercentage",
            ],
          },
        ],
      })
    ).map((c) => {
      return {
        creditorName: c.institution,
        totalBalance: parseFloat(
          (
            c.Creditor_Debtors.reduce((acc, d) => {
              return (acc += d.balance);
            }, 0) / 100
          ).toFixed(2)
        ),
        averageMinPaymentPercentage: parseFloat(
          (
            c.Creditor_Debtors.reduce((acc, d) => {
              return (acc += d.minPaymentPercentage);
            }, 0) /
            c.Creditor_Debtors.length /
            100
          ).toFixed(2)
        ),
      };
    });

    res.send(creditorInfo);
  })
);

// get creditor by institution
router.get(
  "/:institution",
  asyncHandler(async (req, res) => {
    const { institution } = req.params;
    console.log(institution);

    const dataByCreditor = (
      await Creditor_Debtor.findAll({
        attributes: [
          "id",
          "creditorId",
          "debtorId",
          "balance",
          "minPaymentPercentage",
        ],

        include: [
          {
            model: Creditor,
            attributes: ["id", "institution"],
            where: {
              institution,
            },
          },
          {
            model: Debtor,
            attributes: ["firstName", "lastName"],
          },
        ],
      })
    ).map((c) => {
      return {
        id: c.id,
        creditorName: c.Creditor.institution,
        firstName: c.Debtor.firstName,
        lastName: c.Debtor.lastName,
        minPaymentPercentage: parseFloat(
          (c.minPaymentPercentage / 100).toFixed(2)
        ),
        balance: parseFloat((c.balance / 100).toFixed(2)),
      };
    });

    res.send(dataByCreditor);
  })
);

// get credit analysis of creditors where balance > $2000 and pay percentage < 29.99%
router.get(
  "/analysis",
  asyncHandler(async (req, res) => {
    const creditAnalysis = (
      await Creditor_Debtor.findAll({
        attributes: [
          "id",
          "creditorId",
          "debtorId",
          "balance",
          "minPaymentPercentage",
        ],
        where: {
          [Op.and]: [
            {
              balance: {
                [Op.gt]: 2000 * 100,
              },
            },
            {
              minPaymentPercentage: {
                [Op.lt]: 2.99 * 100,
              },
            },
          ],
        },
        include: [
          {
            model: Creditor,
            attributes: ["id", "institution"],
          },
          {
            model: Debtor,
            attributes: ["firstName", "lastName"],
          },
        ],
      })
    ).map((c) => {
      return {
        id: c.id,
        creditorName: c.Creditor.institution,
        firstName: c.Debtor.firstName,
        lastName: c.Debtor.lastName,
        minPaymentPercentage: parseFloat(
          (c.minPaymentPercentage / 100).toFixed(2)
        ),
        balance: parseFloat((c.balance / 100).toFixed(2)),
      };
    });

    res.send(creditAnalysis);
  })
);

// update an existing creditor data model
router.patch(
  "/",
  asyncHandler(async (req, res) => {
    const {
      id,
      institution,
      firstName,
      lastName,
      balance,
      minPaymentPercentage,
    } = req.body;

    let creditorDebtor;
    let creditor;
    let debtor;

    if (!id) {
      return res.status(422).json({ error: "Invalid parameters" });
    }

    if (typeof id !== "number") {
      return res.status(422).json({ error: "id must be of type number" });
    }

    if ((!firstName && lastName) || (firstName && !lastName)) {
      return res.status(422).json({ error: "firstName AND lastName required" });
    }

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      return res
        .status(422)
        .json({ error: "firstName and lastName must be of type string" });
    }

    if (
      !institution &&
      !firstName &&
      !lastName &&
      !balance &&
      !minPaymentPercentage
    ) {
      return res.sendStatus(200);
    }

    if (institution) {
      if (typeof institution !== "string") {
        return res
          .status(422)
          .json({ error: "institution name must be of type string" });
      }
    }

    if (balance) {
      if (typeof balance !== "number") {
        return res
          .status(422)
          .json({ error: "balance must be of type number" });
      }
    }

    if (minPaymentPercentage) {
      if (typeof minPaymentPercentage !== "number") {
        return res
          .status(422)
          .json({ error: "minPaymentPercentage must be of type number" });
      }
    }

    creditorDebtor = await Creditor_Debtor.findOne({
      where: {
        id,
      },
    });

    if (!creditorDebtor) {
      return res
        .status(500)
        .json({ error: `Cannot update record. Invalid id: ${id}` });
    }

    debtor = await findOrCreateDebtor(firstName, lastName);

    if (institution) {
      creditor = await findOrCreateCreditor(institution);
    }

    await Creditor_Debtor.update(
      {
        creditorId: creditor ? creditor.id : creditorDebtor.creditorId,
        debtorId: debtor ? debtor.id : creditorDebtor.debtorId,
        balance: balance != null ? balance * 100 : creditorDebtor.balance,
        minPaymentPercentage:
          minPaymentPercentage != null
            ? minPaymentPercentage * 100
            : creditorDebtor.minPaymentPercentage,
      },
      {
        where: {
          id,
        },
      }
    );

    res.sendStatus(200);
  })
);

// create a new creditor data model
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { institution, firstName, lastName, balance, minPaymentPercentage } =
      req.body;

    let debtor;
    let creditor;

    if (
      !institution ||
      !firstName ||
      !lastName ||
      balance == null ||
      minPaymentPercentage == null
    ) {
      return res.status(422).json({ error: "Invalid parameters" });
    }

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      return res
        .status(422)
        .json({ error: "firstName and lastName must be of type string" });
    }

    if (typeof institution !== "string") {
      return res
        .status(422)
        .json({ error: "institution name must be of type string" });
    }

    if (typeof balance !== "number") {
      return res.status(422).json({ error: "balance must be of type number" });
    }

    if (typeof minPaymentPercentage !== "number") {
      return res
        .status(422)
        .json({ error: "minPaymentPercentage must be of type number" });
    }

    creditor = await findOrCreateCreditor(institution);

    debtor = await findOrCreateDebtor(firstName, lastName);

    await Creditor_Debtor.create({
      creditorId: creditor.id,
      debtorId: debtor.id,
      balance: balance * 100,
      minPaymentPercentage: minPaymentPercentage * 100,
    });
    res.sendStatus(200);
  })
);

module.exports = router;
