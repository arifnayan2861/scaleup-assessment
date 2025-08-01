const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (amount, userId) => {
  return {
    status: "success",
    userId,
    amount,
  };
};

module.exports = { processPayment };
