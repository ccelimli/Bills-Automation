import React from "react";
import { Card, Col, Image, Row, Typography } from "antd";
import Card1 from "../../assets/images/card1.jpg";
import Card2 from "../../assets/images/card2.jpg";
import Card3 from "../../assets/images/card3.jpg";

const Home = () => {
    const { Text } = Typography;

    return (
        <>
        <div className="layout-content">
            <Row gutter={[24]}>
                <Col span={8}>
                    <Card bordered={false} className="criclebox h-full">
                        <Image
                            width={"100%"}
                            height={"100%"}
                            src={Card1}
                            preview={false}
                            style={{
                            borderRadius: 10,
                            }}
                        />
                        <Text>
                            <p>
                            Yardım, insanoğlunun varoluşundan beri önemini koruyan,
                            dayanışma ve empatiyle şekillenen bir kavramdır.
                            </p>
                        </Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="criclebox h-full">
                        <Image
                            width={"100%"}
                            height={"100%"}
                            src={Card2}
                            preview={false}
                            style={{
                            borderRadius: 10,
                            }}
                        />
                        <Text>
                            <br />
                            <p>test</p>
                        </Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="criclebox h-full">
                        <Image
                            width={"100%"}
                            height={"100%"}
                            src={Card3}
                            preview={false}
                            style={{
                            borderRadius: 10,
                            }}
                        />
                        <Text>test</Text>
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    );
};

export default Home;
