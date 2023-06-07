import React, { useState } from 'react';
import { Tabs } from "antd";
import GetAllBills from "./GetAllBills";

const BillHelp = () => {
    const [ getBillByCategoryId, SetGetBillByCategoryId ] = useState(1)
    const onChange = (key) => {
        SetGetBillByCategoryId(key)
    };
    const items = [
        {
            key: "1",
            label: `Tüm Faturalar`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "2",
            label: `Elektrik`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "3",
            label: `Su`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "4",
            label: `Doğalgaz`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "5",
            label: `Cep Telefonu`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "6",
            label: `İnternet`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "7",
            label: `TV`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        },
        {
            key: "8",
            label: `Telekom`,
            children: <GetAllBills getBillByCategoryId={getBillByCategoryId} />,
        }
    ];
    
    return (
        <Tabs 
            defaultActiveKey="9" 
            items={items} 
            onChange={onChange} 
            type="card"
            centered
        />
    )
};
export default BillHelp;

