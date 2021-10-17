import React, {useEffect, useState} from "react";
import axios from "axios";
import QRCode from 'qrcode.react';

let eventId;
let orderType;
export default function ETicket(props){
    const [isLoading,setLoading] = useState(true);
    const [orderData,setData] = useState();
    var params =props.location.search.split("&");
    eventId = params[0].slice(4);
    orderType = params[1].slice(5);
    useEffect(()=>{
        if (orderType == "sports"){
            axios.get("../sportsEvents.json",).then(response =>{
                for(let n in response.data) {
                    var ids = response.data[n].eventId;
                    if (eventId == ids){
                        setData(response.data[n]);
                        setLoading(false);
                    }
                }
            });
        }else if(orderType == "music"){
            axios.get("../musicEvents.json",).then(response =>{
                for(let n in response.data) {
                    var ids = response.data[n].eventId;
                    if (eventId == ids){
                        setData(response.data[n]);
                        setLoading(false);
                    }
                }
            });
        }

    },[]);
    if (isLoading){
        return(
            <div>loading</div>
        )
    }

    return(
        <div style={{marginTop:"10%"}}>
            <QRCode
                value='https://www.baidu.com/'
                size={300}
                fgColor="#000000"  //QR code color
                imageSettings={{ //QR code img
                    src:orderData.eventImg,
                    height: 60,
                    width: 60,
                    excavate: true
                }}
            />
        </div>
    )
}