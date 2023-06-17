import React from 'react';
import { Layout, Row, Col } from "antd";

const Footer = () => {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright" >
            © 2023 made with by
            <a href="#pablo" className="font-weight-bold" target="_blank">
              Cemal Çelimli
            </a>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
