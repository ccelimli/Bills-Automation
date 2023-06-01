import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Descriptions, Row, Space } from "antd";
import Loading from "../Loading";

const GetAllBills = ({ getBillByCategoryId }) => {
    const [bills, setBills] = useState([]);
    const [billtype, setBillType] = useState("")
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(async () => {
        let categoryId = Number(getBillByCategoryId)
        selectedBillType(categoryId)

        await axios.get("https://localhost:7166/api/Bills/getbilldetails")
        .then(async (response) => {
            const resData = await response.data.data
            setBills(resData)
        })
        .catch((error) => {
            console.log(error)
        });

        setPageLoading(true)
        setTimeout(() => {
            setPageLoading(false)
        }, 1500);
    }, [getBillByCategoryId, billtype])

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

    console.log(bills);

    return (
        <>
            <div className="layout-content">
                {
                    !pageLoading ?
                    (
                        <Row gutter={[24]}>
                            {
                                bills
                                .filter((item) => billtype === "All" || item.categoryName === billtype)
                                .map((item) => 
                                (
                                    <Col span={6}
                                        style={{
                                            marginBottom: 25
                                        }}
                                        key={item.id}
                                    >
                                        <Card 
                                            bordered={false} 
                                            className="criclebox h-full"
                                        >
                                            <Descriptions title={item.categoryName} size="small" bordered="true">
                                                <Descriptions.Item span={3} label="Şehir">
                                                    {item.cityName}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Şirket">
                                                    {item.institutionName}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Sözleşme No">
                                                    {item.contractNo}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Fatura Kesim Tarihi">
                                                    {item.invoiceDate}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Son Ödeme Tarihi">
                                                    {item.dateOfLastPayment}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={3} label="Fatura Tutarı">
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
                                                > 
                                                    <a
                                                        href={item.website}
                                                    >
                                                        Ödeme Yap
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
        </>
    )
}

export default GetAllBills;
