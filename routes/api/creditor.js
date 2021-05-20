const router = require("express").Router();
const { Op, Sequelize } = require("sequelize");

const { Creditor, Creditor_Debtor, Debtor } = require("../../db/models");

const asyncHandler = require("express-async-handler");

// Get all creditors
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
        totalBalance: (
          c.Creditor_Debtors.reduce((acc, d) => {
            return (acc += d.balance);
          }, 0) / 100
        ).toFixed(2),
        averageMinPaymentPercentage: (
          c.Creditor_Debtors.reduce((acc, d) => {
            return (acc += d.minPaymentPercentage);
          }, 0) /
          c.Creditor_Debtors.length /
          10
        ).toFixed(2),
      };
    });

    res.send(creditorInfo);
  })
);

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
                [Op.gt]: 200000,
              },
            },
            {
              minPaymentPercentage: {
                [Op.lt]: 2.99 * 10,
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
        minPaymentPercentage: (c.minPaymentPercentage / 10).toFixed(2),
        balance: (c.balance / 100).toFixed(2),
      };
    });

    res.send(creditAnalysis);
  })
);

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
        minPaymentPercentage: (c.minPaymentPercentage / 10).toFixed(2),
        balance: (c.balance / 100).toFixed(2),
      };
    });

    res.send(dataByCreditor);
  })
);

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
      return res.sendStatus(422).json({ error: "Invalid parameters" });
    }

    if ((!firstName && lastName) || (firstName && !lastName)) {
      return res
        .sendStatus(422)
        .json({ error: "firstName AND lastName required" });
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

    if (institution) {
      creditor = await Creditor.findOne({
        where: {
          institution,
        },
      });
    }

    if (!creditor) {
      creditor = await Creditor.create({
        institution: institution.toUpperCase(),
      });
    }

    debtor = await Debtor.findOne({
      where: {
        firstName,
        lastName,
      },
    });

    if (!debtor) {
      debtor = await Debtor.create({
        firstName,
        lastName,
      });
    }

    await Creditor_Debtor.update(
      {
        creditorId: creditor ? creditor.id : creditorDebtor.creditorId,
        debtorId: debtor ? debtor.id : creditorDebtor.debtorId,
        balance: balance ? balance * 100 : creditorDebtor.balance,
        minPaymentPercentage: minPaymentPercentage
          ? minPaymentPercentage * 10
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

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { institution, firstName, lastName, balance, minPaymentPercentage } =
      req.body;

    let debtor;
    let creditor;

    if (institution) {
      creditor = await Creditor.findOne({
        where: {
          institution,
        },
      });
    } else {
      res.status(500).json({ error: "Invalid parameters" });
    }

    if (!creditor) {
      creditor = await Creditor.create({
        institution: institution.toUpperCase(),
      });
    }

    if (firstName && lastName) {
      debtor = await Debtor.findOne({
        where: {
          firstName,
          lastName,
        },
      });
    } else {
      res.status(500).json({ error: "Invalid parameters" });
    }

    if (!debtor) {
      debtor = await Debtor.create({
        firstName,
        lastName,
      });
    }

    await Creditor_Debtor.create({
      creditorId: creditor.id,
      debtorId: debtor.id,
      balance: balance * 100,
      minPaymentPercentage: minPaymentPercentage * 10,
    });
    res.sendStatus(200);
  })
);

module.exports = router;
