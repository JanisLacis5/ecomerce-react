import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {loadStripe} from "@stripe/stripe-js"
import {
    PaymentElement,
    useStripe,
    Elements,
    useElements,
} from "@stripe/react-stripe-js"
import axios from "axios"
import {useCartContext} from "../context/cart_context"
import {useUserContext} from "../context/user_context"
import {formatPrice} from "../utils/helpers"
import {useHistory} from "react-router-dom"

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    )
                    break
                default:
                    setMessage("Something went wrong.")
                    break
            }
        })
    }, [stripe])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message)
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsLoading(false)
    }

    const paymentElementOptions = {
        layout: "tabs",
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay now"
                    )}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

const StripeCheckout = () => {
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({items: [{id: "xl-tshirt"}]}),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [])

    return (
        <Wrapper>
            {clientSecret && (
                <Elements stripe={promise}>
                    <CheckoutForm />
                </Elements>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`
    form {
        width: 30vw;
        align-self: center;
        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
            0px 2px 5px 0px rgba(50, 50, 93, 0.1),
            0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
        border-radius: 7px;
        padding: 40px;
    }
    input {
        border-radius: 6px;
        margin-bottom: 6px;
        padding: 12px;
        border: 1px solid rgba(50, 50, 93, 0.1);
        max-height: 44px;
        font-size: 16px;
        width: 100%;
        background: white;
        box-sizing: border-box;
    }
    .result-message {
        line-height: 22px;
        font-size: 16px;
    }
    .result-message a {
        color: rgb(89, 111, 214);
        font-weight: 600;
        text-decoration: none;
    }
    .hidden {
        display: none;
    }
    #card-error {
        color: rgb(105, 115, 134);
        font-size: 16px;
        line-height: 20px;
        margin-top: 12px;
        text-align: center;
    }
    #card-element {
        border-radius: 4px 4px 0 0;
        padding: 12px;
        border: 1px solid rgba(50, 50, 93, 0.1);
        max-height: 44px;
        width: 100%;
        background: white;
        box-sizing: border-box;
    }
    #payment-request-button {
        margin-bottom: 32px;
    }
    /* Buttons and links */
    button {
        background: #5469d4;
        font-family: Arial, sans-serif;
        color: #ffffff;
        border-radius: 0 0 4px 4px;
        border: 0;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: block;
        transition: all 0.2s ease;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        width: 100%;
    }
    button:hover {
        filter: contrast(115%);
    }
    button:disabled {
        opacity: 0.5;
        cursor: default;
    }
    /* spinner/processing state, errors */
    .spinner,
    .spinner:before,
    .spinner:after {
        border-radius: 50%;
    }
    .spinner {
        color: #ffffff;
        font-size: 22px;
        text-indent: -99999px;
        margin: 0px auto;
        position: relative;
        width: 20px;
        height: 20px;
        box-shadow: inset 0 0 0 2px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
    }
    .spinner:before,
    .spinner:after {
        position: absolute;
        content: "";
    }
    .spinner:before {
        width: 10.4px;
        height: 20.4px;
        background: #5469d4;
        border-radius: 20.4px 0 0 20.4px;
        top: -0.2px;
        left: -0.2px;
        -webkit-transform-origin: 10.4px 10.2px;
        transform-origin: 10.4px 10.2px;
        -webkit-animation: loading 2s infinite ease 1.5s;
        animation: loading 2s infinite ease 1.5s;
    }
    .spinner:after {
        width: 10.4px;
        height: 10.2px;
        background: #5469d4;
        border-radius: 0 10.2px 10.2px 0;
        top: -0.1px;
        left: 10.2px;
        -webkit-transform-origin: 0px 10.2px;
        transform-origin: 0px 10.2px;
        -webkit-animation: loading 2s infinite ease;
        animation: loading 2s infinite ease;
    }
    @keyframes loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @media only screen and (max-width: 600px) {
        form {
            width: 80vw;
        }
    }
`

export default StripeCheckout
