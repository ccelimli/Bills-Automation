import React from 'react';
import { Tabs } from "antd";
import GetAllDonation from "./GetAllDonation";

const Donation = () => {
    const onChange = (key) => {
        console.log(key);
    }
    const items = [
        {
            key: "animalShelters",
            label: `Barınaklar`,
            children: <GetAllDonation selected={'animalShelters'} key={'animalShelters'} />
        },
        {
            key: "foundations",
            label: `Kurumlar`,
            children: <GetAllDonation selected={'foundations'} key={'foundations'} />
        }
    ]
    
    return (
        <>
            <Tabs 
                defaultActiveKey="animalShelters" 
                items={items} 
                onChange={onChange} 
                type="card"
            />
        </>
    )
};
export default Donation;