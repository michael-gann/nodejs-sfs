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
    ).reduce((map, c) => {
      map[c.institution] = {
        totalBalance: (
          c.Creditor_Debtors.reduce((acc, d) => {
            return (acc += d.balance);
          }, 0) / 100
        ).toFixed(2),
        averageMinPay: (
          c.Creditor_Debtors.reduce((acc, d) => {
            return (acc += d.minPaymentPercentage);
          }, 0) /
          c.Creditor_Debtors.length /
          100
        ).toFixed(2),
      };

      return map;
    }, {});

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
                [Op.lt]: 299.9,
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
        minPaymentPercentage: (c.minPaymentPercentage / 100).toFixed(2),
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

    const creditor = await Creditor.findOne({
      where: {
        institution,
      },
    });

    res.send(creditor);
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const {
      institution,
      creditorId,
      debtorId,
      firstName,
      lastName,
      balance,
      minPaymentPercentage,
      creditorDebtorId,
    } = req.body;

    const updateMessages = {
      creditorDidUpdate: false,
      debtorDidUpdate: false,
      creditorDebtorDidUpdate: false,
    };

    if (creditorId) {
      const newCreditor = await Creditor.update(
        {
          institution,
        },
        {
          where: { id: creditorId },
        }
      );
      updateMessages["creditorDidUpdate"] = true;
    }

    if (debtorId) {
      const newDebtor = await Debtor.update(
        {
          firstName,
          lastName,
        },
        {
          where: {
            id: debtorId,
          },
        }
      );

      updateMessages["debtorDidUpdate"] = true;
    }

    if (creditorDebtorId) {
      const newCreditor_Debtor = await Creditor_Debtor.update(
        {
          balance,
          minPaymentPercentage,
        },
        {
          where: {
            id: creditorDebtorId,
          },
        }
      );

      updateMessages["creditorDebtorDidUpdate"] = true;
    }

    res.send(updateMessages);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { institution, firstName, lastName, balance, minPaymentPercentage } =
      req.body;

    const newCreditor = await Creditor.create({
      institution,
    });

    const newDebtor = await Debtor.create({
      firstName,
      lastName,
    });

    const newCreditor_Debtor = await Creditor_Debtor.create({
      creditorId: newCreditor.id,
      debtorId: newDebtor.id,
      balance,
      minPaymentPercentage,
    });

    res.send(newCreditor_Debtor);
  })
);

module.exports = router;
