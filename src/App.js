import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'

import 'bootswatch/dist/lux/bootstrap.min.css'
import './App.css'

const stripePromise = loadStripe(
  'pk_test_51LVhuNGZCoUhdempeuLZScU9BSjym86ji19YjkpFBaBMuACGX5anJToeQpMH4ksNFSyeGshaX83d9AVMXnShe0KY00xHD6MAe6'
)

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  async function handleSubmit(e) {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement), // Element capture input
    })

    if (!error) {
      const { id } = paymentMethod
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/checkout',
          {
            id,
            amount: 5000000,
            description: 'Iphone X',
          }
        )

        console.log(data)

        elements.getElement(CardElement).clear()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src={
          'https://cdn.pocket-lint.com/r/s/970x/assets/images/158444-phones-review-apple-iphone-13-review-images-image1-clh15n2ocg.jpg'
        }
        alt="iphone"
        className="img-fluid"
      />
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <h2 className="text-center my-2">Price: $5.000.000</h2>
      <button className="btn btn-outline-primary">Buy</button>
    </form>
  )
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  )
}

export default App
