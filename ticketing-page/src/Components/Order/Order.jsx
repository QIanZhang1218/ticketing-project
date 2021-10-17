import React, {useEffect, useState} from 'react';
import {ButtonGroup, Col, ToggleButton, Form, Button} from "react-bootstrap";
import OrderStyle from './Order.module.css';
import axios from "axios";
import moment from "moment";
import {AiOutlineShoppingCart} from "react-icons/all";

export default function PlaceOrder(props){
    const [isLoading,setLoading] = useState(true);
    const [details,setDetails] =useState();
    const [orderSummary,setSummary] = useState(0);
    const [radioValue, setRadioValue] = useState('0');
    //get type params from url.
    console.log(props);
    const currentType = props.eventDetails.eventType;
    useEffect(()=>{
        if(currentType == "sports"){
            axios.get("../sportsEvents.json",).then(response =>{
                const eventId = props.eventDetails.eventId;
                console.log(1);
                for(let n in response.data) {
                    var ids = response.data[n].eventId;
                    if (eventId == ids){
                        setDetails(response.data[n]);
                        setLoading(false);
                    }
                }

            });
        }else if(currentType == "music"){
            axios.get("../musicEvents.json",).then(response =>{
                const eventId = props.eventDetails.eventId;

                console.log(2);
                for(let n in response.data) {
                    var ids = response.data[n].eventId;
                    if (eventId == ids){
                        setDetails(response.data[n]);
                        setLoading(false);
                    }
                }

            });
        }

    },[])
    if (isLoading){
        return(
            <div>loading</div>
        )
    }

    if (orderSummary == 0){
        var summary = <div><AiOutlineShoppingCart variant="disabled" className={OrderStyle.emptyCart}/></div>
        var checkOutBtn =  <Button className={OrderStyle.checkoutBtn} variant="secondary" disabled> CHECK OUT</Button>
    }else{
        if (orderSummary.date == "0"){
            summary = <div><AiOutlineShoppingCart variant="disabled" className={OrderStyle.emptyCart}/></div>
            checkOutBtn =  <Button className={OrderStyle.checkoutBtn} variant="secondary" disabled> CHECK OUT</Button>
        }
        else{
            var orderAmount = orderSummary.amount;
            var ticketPrice = details.ticketPrice;
            summary = <div className={OrderStyle.orderSummary}>
                <p className={OrderStyle.orderTitle}>Order Summary:</p>
                <p className={OrderStyle.orderDetails}>{orderSummary.amount} * NZ$ {details.ticketPrice} </p>
                <p className={OrderStyle.totalPrice}>Total: {orderAmount * ticketPrice}</p>
            </div>
            checkOutBtn = <Button className={OrderStyle.checkoutBtn} onClick={()=>{window.location.href="/checkout?"+orderSummary.total+"&id="+details.eventId+"&type="+currentType}}> CHECK OUT</Button>
        }
    }

    return(
        <div className={OrderStyle.orderContainer}>
            <Col xs={10} md={7}>
                <div className={OrderStyle.eventInfo}>
                    <div className={OrderStyle.eventTitle}>
                        <p>{details.eventName}</p>
                        <p style={{color:"grey",fontSize:"14px"}}>{moment(details.eventDate[0]).format("MMM Do, h:mm a")}</p>
                    </div>
                    <div className={OrderStyle.ticketSelect}>
                        <span className={OrderStyle.actionTitle}>Select Date:</span>
                        <ButtonGroup className={OrderStyle.selectContainer}>
                            {details.eventDate.map((item,index ) => {
                                return(
                                    <div>
                                        <ToggleButton
                                            className={OrderStyle.selectRadio}
                                            key={item}
                                            id={item}
                                            type="radio"
                                            variant="outline-primary"
                                            name="radio"
                                            value={item}
                                            checked={radioValue === item}
                                            onChange={(e) => {
                                                    setRadioValue(e.currentTarget.value)
                                                console.log(radioValue);
                                                }
                                            }
                                        >
                                            {moment(item).format("MMM Do, h:mm a")}
                                        </ToggleButton>
                                    </div>
                                )
                            })}
                        </ButtonGroup>
                        <div className={OrderStyle.dropdownContainer}>
                            <span className={OrderStyle.actionTitle}>Price: NZ${details.ticketPrice}</span>
                            <Form.Control
                                as="select"
                                custom
                                className={OrderStyle.quantitySelect}
                                onChange={e=>{
                                    let obj={
                                        "date":radioValue,
                                        "amount":e.target.value,
                                        "title":details.eventName,
                                        "total":e.target.value * details.ticketPrice
                                    }
                                    console.log(obj);
                                    setSummary(obj);
                                }}
                            >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                        </div>
                    </div>
                    {checkOutBtn}
                </div>
            </Col>
            <Col xs={8} md={5}>
                <div className={OrderStyle.summaryContainer}>
                    <div className={OrderStyle.imgBox}>
                        <img className={OrderStyle.imgBox} src={details.eventImg} alt={"No image"}/>
                    </div>
                    <div className={OrderStyle.orderDetail}>
                        {summary}
                    </div>
                </div>
            </Col>

        </div>
    )
}