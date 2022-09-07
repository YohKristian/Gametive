const midtransClient = require("midtrans-client");
const { User } = require("../models");

class MidtransController {
    static async generateSnapToken(req, res, next) {
        try {
            const totalCostNeedToPay = req.body.totalCostNeedToPay;

            // Create Snap API instance
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: `${process.env.SECRET_Server_Key}`
            });

            const findUser = await User.findByPk(req.user.id);

            if (!findUser) throw { code: 100 };

            let parameter = {
                "transaction_details": {
                    "order_id": `ORDERID-${Date.now()}`,
                    "gross_amount": +totalCostNeedToPay
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "username": findUser.firstName,
                    "email": findUser.email,
                }
            };

            const transaction = await snap.createTransaction(parameter)
            res.status(201).json({
                message: "Success Create Token Transaction Midtrans",
                transaction
            })
        } catch (error) {
            next(error);
        }
    }

    static async updateStatusToPayed(req, res, next) {
        try {
            // await Order.update({ orderStatus: "Payed" }, {
            //     where: {
            //         orderStatus: "Cart",
            //         ProfileId: req.user.profile_id
            //     }
            // })

            res.status(200).json({
                message: "Paying successful!"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MidtransController;