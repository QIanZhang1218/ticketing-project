import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import "./Checkout.css";
const promise = loadStripe("pk_test_51JfBnYBuZCt7GKI5c6lgOY1ZoLrzBa5qwzqpQ10tEfCbjqMiGL7QrA3aAvR8Tyyhp0Paj7HYAwDIro42TjFGdEii00BAtVHilN");
let orderTotal;
let eventId;
let params;
let eventType;
export default function Checkout(props){
    // split url params by "&"
    params =props.location.search.split("&");
    orderTotal = params[0].slice(1);
    eventId = params[1].slice(3)
    eventType = params[2].slice(5);
    let obj={
        "eventId" : eventId,
        "orderTotal" : orderTotal,
        "type":eventType
    }
    return(
        <div className="App">
            <Elements stripe={promise}>
                <CheckoutForm pay = {obj}/>
            </Elements>
        </div>
    )
}