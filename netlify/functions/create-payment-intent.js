require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount, email } = JSON.parse(event.body);

    // 汇率：1 NTD = 0.033 USD (假设)
    const exchangeRate = 0.033;
    const ntdAmount = amount; // 新台币金额

    // 将新台币金额转换为美元金额
    const usdAmount = ntdAmount * exchangeRate;

    // 将美元金额转换为美分金额
    const usdCentsAmount = Math.round(usdAmount * 100);
    console.log(usdCentsAmount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: usdCentsAmount,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (err) {
    console.log({ err });

    return {
      status: 400,
      body: JSON.stringify({ err }),
    };
  }
};
