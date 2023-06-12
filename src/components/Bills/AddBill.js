import React, { useEffect, useState } from 'react'
import { Card, Modal, Form, Select, Button, DatePicker, Input , ConfigProvider  } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import trTR from 'antd/es/locale/tr_TR'
import { addBills, getAllCategories, getAllCities, getAllInstitutions } from '../../redux/crudSlice';
import { useDispatch, useSelector } from 'react-redux'
import AddFloatButton from './AddFloatButton';
import { toast } from "react-toastify";

const AddBill = () => {
    const [openModal, setOpenModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const [categories, setCategories] = useState([])
    const [cities, setCities] = useState([])
    const [institutions, setInstitutions] = useState([])
    const [form] = Form.useForm()
    const { Option } = Select
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state.user.getUser?.data?.data?.id)

    useEffect(() => {
        dispatch(getAllCategories())
        .then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload?.success) {
                    const resData = response.payload.data
                    setCategories(resData)
                } else {
                    throw new Error(response.payload.message)
                }
            } else {
                throw new Error('Get All Categories Request Failed')
            }
        })  
        .catch((err) => {
            console.error(err);
        })
    }, [dispatch])

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

    useEffect(() => {
        dispatch(getAllInstitutions())
        .then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload?.success) {
                    const resData = response.payload.data
                    setInstitutions(resData)
                } else {
                    throw new Error(response.payload.message)
                }
            } else {
                throw new Error('Get All Institutions Request Failed')
            }
        })  
        .catch((err) => {
            console.error(err);
        })
    }, [dispatch])

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            }
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            }
        }
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            }
        }
    }

    const onFinish = (data) => {
        setFormFieldError(true)
        console.log('Finish Values: ', data)

        const values = {
            ...data, 
            userId : currentUserId 
        }

        dispatch(addBills(values))
        .then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload?.success) {
                    toast.success(response.payload.message)
                } else {
                    toast.error(response.payload.message)
                    throw new Error(response.payload.message)
                }
            } else {
                throw new Error('Add Bills Request Failed')
            }
        })  
        .catch((err) => {
            console.error(err);
        })
    }

    const onFinishFailed = (values) => {
        setFormFieldError(false)
        console.log('onFinishFailed Values: ', values)
    }

    const handleLoading = () => {
        setButtonLoading(true)
        setTimeout(() => {
        setButtonLoading(false)
        }, 3000)
    }

    return (
        <>
            <Modal
                title='Fatura Ekleme'
                open={openModal}
                width={800}
                onCancel={() => setOpenModal(false)}
                centered
                footer={false}
            >
                <Card>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name='addBill'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        colon={false}
                        size='large'
                        labelAlign='left'
                        scrollToFirstError
                        style={{
                            maxWidth: 800,
                            width: '100%',
                            margin: '0 auto'
                        }}
                    >

                        <Form.Item 
                            name="category"
                            hasFeedback
                            label={
                                <span
                                    style={{
                                        fontSize: 18
                                    }}
                                >
                                    Kategori :
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Bu alan boş bırakılamaz !'
                                }
                            ]}
                        >
                            <Select
                                placeholder='Kategori seçiniz'
                            >
                                {
                                    categories.map((item) => (
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
                            name="city"
                            hasFeedback
                            label={
                                <span
                                    style={{
                                        fontSize: 18
                                    }}
                                >
                                    Şehir :
                                </span>
                            }
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
                            name="institution"
                            hasFeedback
                            label={
                                <span
                                    style={{
                                        fontSize: 18
                                    }}
                                >
                                    Kurum :
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Bu alan boş bırakılamaz !'
                                }
                            ]}
                        >
                            <Select
                                placeholder='Kurum seçiniz'
                            >
                                {
                                    institutions.map((item) => (
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
                            name="contractNo"
                            hasFeedback
                            label={
                                <span
                                    style={{
                                        fontSize: 18
                                    }}
                                >
                                    Sözleşme No :
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Bu alan boş bırakılamaz !'
                                }
                            ]}
                        >
                            <Input
                                placeholder='Sözleşme no giriniz !'
                                size='small'
                                style={{
                                    borderRadius: 8
                                }}
                            />
                        </Form.Item>

                        <Form.Item 
                            name="invoiceValue"
                            hasFeedback
                            label={
                                <span
                                    style={{
                                        fontSize: 18
                                    }}
                                >
                                    Fatura Tutarı :
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Bu alan boş bırakılamaz !'
                                }
                            ]}
                        >
                            <Input
                                placeholder='Fatura tutarı giriniz !'
                                size='small'
                                style={{
                                    borderRadius: 8
                                }}
                            />
                        </Form.Item>

                        <ConfigProvider locale={trTR}>
                            <Form.Item
                                name="invoiceDate"
                                label={
                                    <span
                                        style={{
                                            fontSize: 18,
                                        }}
                                    >
                                        Fatura Tarihi :
                                    </span>
                                }
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
                                        width: '100%'
                                    }}
                                />
                            </Form.Item>
                        </ConfigProvider>

                        <ConfigProvider locale={trTR}>
                            <Form.Item
                                name="lastPaymentDate"
                                label={
                                    <span
                                        style={{
                                            fontSize: 18,
                                        }}
                                    >
                                        Son Ödeme Tarihi :
                                    </span>
                                }
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
                                        width: '100%'
                                    }}
                                />
                            </Form.Item>
                        </ConfigProvider>

                        <Form.Item
                            {...tailFormItemLayout}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="middle"
                                onClick={() => {
                                    handleLoading()
                                }}
                                style={{
                                    width: '100%',
                                    fontSize: 18,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'open sans'
                                }}
                            >
                            Fatura Ekle
                                {
                                    buttonLoading && formFieldError ? 
                                        <LoadingOutlined /> 
                                            : 
                                        null
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
            <AddFloatButton openModal={openModal} setOpenModal={setOpenModal} />
        </>
    )
}

export default AddBill