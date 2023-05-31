import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Descriptions, Row, Space } from "antd";

const GetAllBills = ({ getBillByCategoryId }) => {
    const [bills, setBills] = useState([]);
    useEffect(async () => {
        // filter yaz 
        await axios.get("https://localhost:7166/api/Bills/getbilldetails")
            .then((response) => {
                setBills(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //console.table(bills);
    console.log(getBillByCategoryId);

    return (
        <>
            <div className="layout-content">
                <Row gutter={[24]}>
                    {
                        bills.map((item) => (
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
                        ))
                    }
                </Row>
            </div>
        </>
    );
};

export default GetAllBills;
