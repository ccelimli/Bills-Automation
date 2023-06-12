import React from 'react'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const AddFloatButton = ({openModal, setOpenModal}) => {
    return (
        <div 
            style={{
                position: "fixed",
                bottom: "40px",
                right: "40px",
                zIndex: 1
            }}
            onClick={() => {setOpenModal(true)}}
        >
            <Button 
                type="primary"
                size='large'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 18,
                    backgroundColor:"#738291"
                }} 
            >
                <PlusOutlined 
                    style={{
                        fontSize: 24
                    }}
                /> Fatura Ekle
            </Button>
        </div>
    )
}

export default AddFloatButton