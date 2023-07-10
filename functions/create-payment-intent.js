//.netlify/functions/create-payment-intent
require("dotenv").config()

const stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY)

exports.handler = async function (event, context) {
    const {total, shipping} = JSON.parse(event.body)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        })
        return {
            statusCode: 200,
            body: JSON.stringify({clientSecret: paymentIntent.client_secret}),
        }
    } catch (error) {
        console.log(error)
    }
}
