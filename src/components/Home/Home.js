import React from 'react';
import { Card, Col, Row } from "antd";

const Home = () => {
    return (
        <>
        <div className="layout-content">
            <Row gutter={[24]}>
            <Col span={8}>
                <Card bordered={false} className="criclebox h-full">
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} className="criclebox h-full">
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} className="criclebox h-full">
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                test <br/>
                </Card>
            </Col>
            </Row>
        </div>
        </>
    );
}

export default Home;
