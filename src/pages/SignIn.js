import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import { userLogin } from "../redux/userSlice";
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const { Title } = Typography;
  const { Footer, Content } = Layout;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const onFinish = (values) => {
    //console.log("Success:", values);

    dispatch(userLogin(values))
    .then((response) => {
        if (response?.meta?.requestStatus === 'fulfilled') {
            if (response?.payload?.success) {
                const resData = response.payload?.data
                localStorage.setItem('token', resData.token)
                navigate("/")
                console.log("Kullanıcı başarıyla giriş yaptı");
            } else {
                throw new Error(response.payload.message)
            }
        } else {
            throw new Error('User Login Request Failed')
        }
    })  
    .catch((err) => {
        console.error(err);
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  }

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Giriş Yap</Title>
            <Title className="font-regular text-muted" level={5}>
              Giriş yapmak için TC kimlik numaranızı ve şifrenizi girin
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="T.C. Kimlik Numarası"
                name="tcNumber"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Lütfen kimlik numaranızı giriniz!",
                  },
                  {
                    type: 'string',
                    whitespace: true,
                    message: "Kimlik numarası boş olamaz!"
                  },
                  {
                    pattern: /^(?!0{11})[1-9][0-9]{10}$/,
                    message: 'Geçersiz T.C. kimlik numarası!'
                  }
                ]}
              >
              
                <Input placeholder="T.C. Kimlik Numarası" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Şifre"
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Lütfen şifrenizi giriniz!",
                  },
                  {
                    type: 'string',
                    whitespace: true,
                    message: "Şifre boş olamaz!"
                  },
                  // {
                  //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  //   message: "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir!"
                  // },
                  // {
                  //   min: 8,
                  //   message: "Şifre en az 8 karakter olmalıdır!"
                  // }
                ]}
              >
                <Input placeholder="Şifre" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Giriş Yap
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Hesabınız yok mu?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Hesap Oluştur
                </Link>
              </p>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright">
          {" "}
          Copyright © 2023 Bill System<a href="#pablo">Celimli</a>
        </p>
      </Footer>
  </Layout>
  )
}

export default SignIn