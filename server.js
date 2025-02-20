require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-payment", async (req, res) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents ($10 = 1000 cents)
            currency: "usd",
            payment_method_types: ["card"], // Accepts card payments
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
