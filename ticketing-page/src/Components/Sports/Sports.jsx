import React, {useEffect, useState} from 'react';
import {Col, ListGroup} from 'react-bootstrap';
import moment from "moment";
import axios from "axios";
import SportsStyle from './Sports.module.css';

export default function SportsEvent(){
    //dummy data for events list
    const [isLoading,setLoading] = useState(true);
    const [sportEvents,SetSportEvents] = useState();
    useEffect(()=>{
        axios.get("../sportsEvents.json",).then(response =>{
            console.log(response.data);
            SetSportEvents(response.data);
            setLoading(false);
        })
        console.log(sportEvents);
    },[])
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return(
        <div>
            <ListGroup>
                {sportEvents.map((item,index ) => {
                    var eventDate =moment(item.eventDate[0]).format("MMM Do, h:mm a");
                    return(
                        <ListGroup.Item className={SportsStyle.listItem} action href={`/detail?id=${item.eventId}?type=${item.eventType}`} id={item.eventId} key={item.eventId}>
                            <Col xs={8} md={5} >
                                <img className={SportsStyle.eventImg} src={item.eventImg}  alt={'Image failed to load'}/>
                            </Col>
                            <Col  xs={10} md={7}>
                                <div className={SportsStyle.eventInfo}>
                                    <h5>{item.eventName}</h5>
                                    <p className={SportsStyle.eventDate}>{eventDate}</p>
                                    <p className={SportsStyle.eventLocation}>Location:{item.eventLocation}</p>
                                    <p className={SportsStyle.eventPrice}>NZ${item.ticketPrice[0]}</p>
                                </div>
                            </Col>
                        </ListGroup.Item>

                    )
                })}
                {/*<ListGroup.Item action href="#link1">*/}
                {/*    Link 1*/}
                {/*</ListGroup.Item>*/}
            </ListGroup>

        </div>
    )
}