import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.post("/create-checkout", async (req, res) => {
  const { name, price } = req.body;

  try {
    const response = await fetch("https://connect.squareup.com/v2/online-checkout/payment-links", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quick_pay: {
          name: name,
          price_money: {
            amount: price,
            currency: "USD"
          }
        }
      })
    });

    const data = await response.json();

    res.json({
      url: data.payment_link.url
    });

  } catch (err) {
    res.status(500).json({ error: "Checkout failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
