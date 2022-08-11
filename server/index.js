const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const { STRIPE_SECRET_KEY } = process.env

const app = express()

const stripe = new Stripe(
  'sk_test_51LVhuNGZCoUhdemptaUZ7R1FtKjZt5lXBfjDjnEoMCTzdXZEGCef4Rd2uFXrTgHQTYn8cwlT0Qe61MCqukegSG6O006mIwMcu7'
)

app.use(cors({ origin: `http://localhost:3000` }))
app.use(express.json())

app.post('/api/checkout', async (req, res, next) => {
  try {
    const { id, amount, description } = req.body

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description,
      payment_method: id,
      confirm: true,
    })

    console.log(payment)

    res.send({ message: 'Payment success' })

    res.send('received')
  } catch (error) {
    console.log(error)
    res.json({ message: error.raw.message })
  }
})

app.listen(3001, () => {
  console.log('listening on port 3001')
})
