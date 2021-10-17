import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {Link} from "react-router-dom";

let orderAmount;
let eventId;
let orderType;
export default function CheckoutForm(props) {
    console.log(props);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    orderAmount = props.pay.orderTotal;
    eventId = props.pay.eventId;
    orderType = props.pay.type;
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: [
                        {
                            id: "xl-tshirt",
                            totalAmount:orderAmount
                        }
                    ]
                })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <div className={"checkoutContainer"}>
            <div className={"amountContainer"}>
                <p>You have to pay <span>NZ${orderAmount}</span> in total</p>
            </div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement className={"checkoutInput"} id="card-element" options={cardStyle} onChange={handleChange} />
                <button
                    className={"checkoutBtn"}
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                <span id="button-text">
                  {processing ? (
                      <div className="spinner" id="spinner"></div>
                  ) : (
                      "Pay now"
                  )}
                </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a
                        href={`https://dashboard.stripe.com/test/payments`}
                    >
                        {" "}
                        Stripe dashboard.
                    </a> Refresh the page to pay again.
                    <Link to={"/eTicket?id="+eventId+"&type="+orderType}>Click here to see the eTicket</Link>
                </p>
            </form>
        </div>
    );
}
