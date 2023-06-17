import React, { useEffect, useState } from "react";
import { Button, Card, Col, Descriptions, Row, Space, Typography } from "antd";
import { useDispatch } from 'react-redux'
import { getAllBills } from "../../redux/crudSlice";
import Loading from "../Loading";
import AddBill from './AddBill'
import { ToastContainer } from "react-toastify";

const GetAllBills = ({ getBillByCategoryId }) => {
    const [bills, setBills] = useState([]);
    const [billtype, setBillType] = useState("")
    const [pageLoading, setPageLoading] = useState(true)
    const { Title } = Typography
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getAllBills())
        .then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload?.success) {
                    const resData = response.payload.data
                    setBills(resData)
                } else {
                    throw new Error(response.payload.message)
                }
            } else {
                throw new Error('Get All Bills Request Failed')
            }
        })  
        .catch((err) => {
            console.error(err);
        })

        let categoryId = Number(getBillByCategoryId)
        selectedBillType(categoryId)

        setPageLoading(true)
        setTimeout(() => {
            setPageLoading(false)
        }, 1500);
    }, [getBillByCategoryId, billtype, dispatch])

    const selectedBillType = (categoryId) => {
        if (categoryId === 1) {
            setBillType("All");
        } else if (categoryId === 2) {
            setBillType("Elektrik");
        } else if (categoryId === 3) {
            setBillType("Su");
        } else if (categoryId === 4) {
            setBillType("Doğalgaz");
        } else if (categoryId === 5) {
            setBillType("Cep Telefonu");
        } else if (categoryId === 6) {
            setBillType("İnternet");
        } else if (categoryId === 7) {
            setBillType("TV");
        } else if (categoryId === 8) {
            setBillType("Telekom");
        }
    }

    const selectedBillTypeColor = (category) => {
        if (category === "Elektrik") {
            return "#ffda59"; 
        } else if (category === "Su") {
            return "#a3fff8"; 
        } else if (category === "Doğalgaz") {
            return "#a1acba"; 
        } else if (category === "Cep Telefonu") {
            return "#ff6a51"; 
        } else if (category === "İnternet") {
            return "#1d6087";
        } else if (category === "TV") {
            return "#a097d5"; 
        } else if (category === "Telekom") {
            return "#61854a"; 
        } else {
            return "red"; 
        }
    }

    const categoryNameSplit = (category) => {
        const categoryName = category.split(" ");
        const firstWord = categoryName[0].split("").map((letter, index) => 
        (
            <span
                key={index}
                style={{
                    textShadow: "1px 1px 1px black",
                }}
            >
                {letter}
            </span>
        ))
        const secondWord = categoryName[1].split("").map((letter, index) => 
        (
            <span
                key={index}
                style={{
                    textShadow: "1px 1px 1px black",
                }}
            >
                {letter}
            </span>
        ))
    
        return <div>{firstWord} {secondWord}</div>
    }

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString)
        const day = dateTime.getDate().toString().padStart(2, "0")
        const month = (dateTime.getMonth() + 1).toString().padStart(2, "0")
        const year = dateTime.getFullYear().toString()
        const hours = dateTime.getHours().toString().padStart(2, "0")
        const minutes = dateTime.getMinutes().toString().padStart(2, "0")
        const seconds = dateTime.getSeconds().toString().padStart(2, "0")
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }

    const textShadow = (text) => {
        return text.split("").map((letter, index) => 
            (
                <span
                    key={index}
                    style={{
                        textShadow: "1px 1px 1px black"
                    }}
                >
                    {letter}
                </span>
            )
        )    
    }
    
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="layout-content">
                {
                    !pageLoading ?
                    (
                        <Row gutter={[24, 24, 24, 24]}>
                            {
                                bills
                                .filter((item) => billtype === "All" || item.categoryName === billtype)
                                .map((item) => 
                                (
                                    <Col 
                                        span={24} sm={12} md={12} lg={6} xl={6}
                                        style={{
                                            marginBottom: 25
                                        }}
                                        key={item.id}
                                    >
                                        <Card 
                                            bordered={false} 
                                            className="criclebox h-full"
                                            style={{
                                                border: `1px solid ${selectedBillTypeColor(item.categoryName)}`
                                            }}
                                        >
                                            <Title
                                                level={4}
                                                style={{
                                                    display: "flex", 
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "white",
                                                    backgroundColor: selectedBillTypeColor(item.categoryName),
                                                    margin: 0,
                                                    padding: '5px 10px',
                                                    borderRadius: '10px 10px 0 0'
                                                }}
                                            >
                                                {
                                                    item.categoryName === "Cep Telefonu" ? 
                                                    (
                                                        categoryNameSplit(item.categoryName)
                                                    )
                                                    :
                                                    (
                                                        textShadow(item.categoryName)
                                                    )
                                                }
                                            </Title>
                                            <Descriptions 
                                                size="small" 
                                                bordered="true"
                                                contentStyle={{
                                                    backgroundColor: "white"
                                                }}
                                            >
                                                <Descriptions.Item span={3} label="Şehir"  >
                                                    {item.cityName}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Şirket"  >
                                                    {item.institutionName}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Sözleşme No"  >
                                                    {item.contractNo}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Fatura Kesim Tarihi"  >
                                                    {formatDateTime(item.invoiceDate)}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Son Ödeme Tarihi"  >
                                                    {formatDateTime(item.dateOfLastPayment)}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Fatura Tutarı"  >
                                                    {item.invoiceValue}
                                                </Descriptions.Item>
                                            </Descriptions>
                                            <Space
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 20
                                                }}
                                            >
                                                <Button 
                                                    type="primary"
                                                    style={{
                                                        color: "white",
                                                        border: "none",
                                                        backgroundColor: selectedBillTypeColor(item.categoryName)
                                                    }}
                                                > 
                                                    <a
                                                        href={item.website}
                                                    >
                                                        {
                                                            textShadow('Ödeme Yap')
                                                        }
                                                    </a>
                                                </Button>
                                            </Space>
                                        </Card>
                                    </Col>
                                )
                                )
                            }
                        </Row>
                        
                    )
                    :
                    (
                        <Loading pageLoading={pageLoading} />
                    )
                }
            </div>
            <AddBill />
        </>
    )
}

export default GetAllBills;
