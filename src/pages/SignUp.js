import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  ConfigProvider,
  DatePicker,
  Select
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import { userRegister } from "../redux/userSlice";
import { useDispatch } from 'react-redux'
import trTR from 'antd/es/locale/tr_TR'
import { getAllCities } from "../redux/crudSlice";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [cities, setCities] = useState([])
  const { Title } = Typography;
  const { Footer, Content } = Layout;
  const { Option } = Select
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCities())
    .then((response) => {
        if (response?.meta?.requestStatus === 'fulfilled') {
            if (response?.payload?.success) {
                const resData = response.payload.data
                setCities(resData)
            } else {
                throw new Error(response.payload.message)
            }
        } else {
            throw new Error('Get All Cities Request Failed')
        }
    })  
    .catch((err) => {
        console.error(err);
    })
}, [dispatch])
  
  const onFinish = (values) => {
    //console.log("Success:", values);
    form.resetFields()

    dispatch(userRegister(values))
    .then((response) => {
        if (response?.meta?.requestStatus === 'fulfilled') {
            if (response?.payload?.success) {
                toast.success(response.payload.message)
            } else {
                toast.error(response.payload.message)
                throw new Error(response.payload.message)
            }
        } else {
            throw new Error('User Register Request Failed')
        }
    })  
    .catch((err) => {
        console.error(err);
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
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
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Üye Ol</Title>
              <Title className="font-regular text-muted" level={5}>
                Üye olmak için gereken bilgileri girin
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
                form={form}
              >

                <Form.Item
                  className="username fullName"
                  label="Ad soyad"
                  hasFeedback
                  style={{
                    marginBottom: 0
                  }}
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Adınızı girin !'
                          },
                          {
                            type: 'string',
                            whitespace: true,
                            message: 'Adınız sadece boşluk karakteri içermemelidir !'
                          }
                        ]}
                      >
                        <Input placeholder={'Ad'} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Soyadınızı girin !'
                          },
                          {
                            type: 'string',
                            whitespace: true,
                            message: 'Soyadınız sadece boşluk karakteri içermemelidir !'
                          }
                        ]}
                      >
                        <Input placeholder={'Soyad'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <ConfigProvider locale={trTR}>
                  <Form.Item
                    className="username"
                    name="birthday"
                    label="Doğum Tarihi"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Bu alan boş bırakılamaz !'
                      }
                    ]}
                  >
                    <DatePicker
                      format={'DD/MM/YYYY'}
                      style={{
                        width: '100%',
                        padding: '13px'
                      }}
                      placeholder="Doğum Tarihi"
                    />
                  </Form.Item>
                </ConfigProvider>

                <Form.Item
                  className="username"
                  label="T.C. Kimlik Numarası"
                  name="nationalityNo"
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
                  label="Telefon Numarası"
                  name="phoneNumber"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Lütfen telefon numaranızı giriniz!",
                    },
                    {
                      type: 'string',
                      whitespace: true,
                      message: "Telefon numarası boş olamaz!"
                    }
                  ]}
                >
                  <Input placeholder="Telefon Numarası" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Adres"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Adresinizi giriniz !'
                    },
                    {
                      type: 'string',
                      whitespace: true,
                      message: 'Adresiniz sadece boşluk karakteri içermemelidir !'
                    }
                  ]}
                >
                  <Input.TextArea showCount maxLength={250} placeholder="Adres" />
                </Form.Item>

                <Form.Item 
                  name="cityId"
                  hasFeedback
                  label="Şehir"
                  rules={[
                    {
                      required: true,
                      message: 'Bu alan boş bırakılamaz !'
                    }
                  ]}
                >
                  <Select
                    placeholder='Şehir seçiniz'
                  >
                    {
                      cities.map((item) => (
                        <Option
                          value={item.id}
                          key={item.id + item.name}
                        >
                          {item.name}
                        </Option>
                      ))
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  validateTrigger="onChange"
                  hasFeedback
                  rules={[
                    {
                      type: 'email',
                      message: 'E-Posta girişi geçerli değil !'
                    },
                    {
                      required: true,
                      message: 'E-posta adresini giriniz !'
                    }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Şifre"
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Şifrenizi giriniz !",
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
                  <Input.Password placeholder="Şifre" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Şifre Onayla"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Şifreyi tekrardan giriniz !',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Şifreler eşlşmiyor !'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Şifreyi kontrol edin" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Üye Ol
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Hesabınız var mu?{" "}
                  <Link to="/sign-in" className="text-dark font-bold">
                    Giriş Yap
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
    </>
  )
}

export default SignUp