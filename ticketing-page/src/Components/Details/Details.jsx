import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Modal} from "react-bootstrap";
import moment from "moment";
import DetailsStyle from './Details.module.css';
import PlaceOrder from '../Order/Order';

export default function SportEventsDetails(props){
    const [isLoading,setLoading] = useState(true);
    const [eventDetail,setDetails] = useState();
    const [item,setItem] = useState()
    const params = props.location.search.split('?');
    const eventType =params[2].slice(5);
    // if (eventType == "sports" ){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(()=>{
           if (eventType == "sports" ){
               axios.get("../sportsEvents.json",).then(response =>{
                    console.log(1);
                   const eventId = params[1].slice(3);

                   for(let n in response.data) {
                       var ids = response.data[n].eventId;
                       if (eventId == ids){
                           setDetails(response.data[n]);
                           setLoading(false);
                       }
                   }

               });
           }else if(eventType == "music"){
               axios.get("../musicEvents.json",).then(response =>{
                   console.log(2);
                   const eventId = params[1].slice(3);

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
    // }

    //react bootstrap modal
    const [show, setShow] = useState(false);
    //close modal
    const handleClose = () => setShow(false);
    //open modal
    const handleShow = () => {
        setItem(eventDetail);
        setShow(true);
    }

    if (isLoading){
        return(
            <div>loading</div>
        )

    }
    //according to the number of price display in different format
    if (eventDetail.ticketPrice.length>1) {
        var test = <p className={DetailsStyle.price}>NZ${eventDetail.ticketPrice[0]}~{eventDetail.ticketPrice[eventDetail.ticketPrice.length-1]}</p>
    }else{
        test =  <p className={DetailsStyle.price}>NZ${eventDetail.ticketPrice}</p>
    }
    // //use moment reformat the date
    var eventDate =moment(eventDetail.eventDate[0]).format("MMM Do, h:mm a");

    return(
        <div>
            <div className={DetailsStyle.container}>
                <div className={DetailsStyle.eventInfoContainer}>
                    <Col xs={8} md={5}>
                        <img  src={eventDetail.eventImg} alt={'Image failed to load'}/>
                    </Col>
                    <Col xs={10} md={7}>
                        <div className={DetailsStyle.eventInfo}>
                            <h5 className={DetailsStyle.eventName}>{eventDetail.eventName}</h5>
                            <p>{eventDate}</p>
                            <p>Location:{eventDetail.eventLocation}</p>
                            {test}
                        </div>
                    </Col>
                </div>
                <div className={DetailsStyle.eventDescription}>
                    <h5>About This Event</h5>
                    <p>{eventDetail.eventInfo}</p>
                </div>
            </div>
            {/*react bootstrap modal*/}
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={show}
                onHide={handleClose}
                centered
            >
                {/*<Modal.Header closeButton>*/}
                {/*    <Modal.Title id="contained-modal-title-vcenter">*/}
                {/*        Place an Order*/}
                {/*    </Modal.Title>*/}
                {/*</Modal.Header>*/}
                <Modal.Body>
                    <PlaceOrder eventDetails = {item}/>
                </Modal.Body>
            </Modal>
            <Button variant="success" onClick={handleShow} >Ticket</Button>
        </div>
    )
}