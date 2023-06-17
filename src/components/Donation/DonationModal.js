import React, { useEffect, useState } from 'react'
import { Modal, Image, Space } from 'antd'
import AkbankLogo from "../../assets/images/banksLogo/akbank.png"
import DenizBankLogo from "../../assets/images/banksLogo/denizbank.png"
import GarantiBBVALogo from "../../assets/images/banksLogo/garanti-bbva.png"
import HalkBankLogo from "../../assets/images/banksLogo/halkbank.png"
import HSBCLogo from "../../assets/images/banksLogo/hsbc.png"
import INGLogo from "../../assets/images/banksLogo/ing.png"
import IsbankasiLogo from "../../assets/images/banksLogo/is-bankasi.png"
import Fibabanka from "../../assets/images/banksLogo/Fibabanka.jpg"
import QNBLogo from "../../assets/images/banksLogo/qnb-finansbank.png"
import SekerbankLogo from "../../assets/images/banksLogo/sekerbank.png"
import TEBLogo from "../../assets/images/banksLogo/teb-turk-ekonomi-bankasi.png"
import ZiraatBankasi from "../../assets/images/banksLogo/ziraat-bankasi.png"
import VakıfBank from "../../assets/images/banksLogo/VakifBank-Logo.png"
import YapıKredi from "../../assets/images/banksLogo/Yapi-Kredi-Logo.png"
import OdeaBank from "../../assets/images/banksLogo/odeabank.png"
import { getbyfoundationId } from '../../redux/animalShelterSlice'
import { useDispatch } from 'react-redux'

const selectedBank = (bankId) => {
    let bankLogo

    if (bankId === 1) {
        bankLogo = AkbankLogo
    } else if(bankId === 2) {
        bankLogo = DenizBankLogo
    }else if(bankId === 3) {
        bankLogo = Fibabanka
    }  else if(bankId === 4) {
        bankLogo = GarantiBBVALogo
    } else if(bankId === 5) {
        bankLogo = HalkBankLogo
    } else if(bankId === 6) {
        bankLogo = HSBCLogo
    } else if(bankId === 7) {
        bankLogo = INGLogo
    } else if(bankId === 8) {
        bankLogo = OdeaBank
    } else if(bankId === 9) {
        bankLogo = QNBLogo
    } else if(bankId === 10) {
        bankLogo = TEBLogo
    } else if(bankId === 11) {
        bankLogo = IsbankasiLogo
    } else if(bankId === 12) {
        bankLogo = VakıfBank
    } else if(bankId === 13) {
        bankLogo = YapıKredi
    } else if(bankId === 14) {
        bankLogo = ZiraatBankasi
    } else if(bankId === 15) {
        bankLogo = SekerbankLogo
    }

    return bankLogo
}



const DonationModal = ({ openModal, setOpenModal, recordId, bankId }) => {
    const [foundationId, setFoundationId] = useState(null)
    const [banks, setBanks] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (recordId !== null) {
            setFoundationId(recordId)

            dispatch(getbyfoundationId({ id: recordId }))
                .then((response) => {
                    if (response?.meta?.requestStatus === "fulfilled") {
                        if (response?.payload?.success) {
                            const data = response.payload.data

                            setBanks(data.filter((item) => item.foundationId === foundationId))

                        } else {
                        throw new Error(response.payload.message)
                        }
                    } else {
                        throw new Error("Get Foundations Id Request Failed")
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
            } 
    }, [recordId, dispatch, foundationId])

    return (
        <Modal
            title="Bağış Yapılabilecek Banka Hesapları"
            open={openModal}
            width={800}
            onCancel={() => setOpenModal(false)}
            centered
            footer={false}
        >
            {
                banks.map((item) => (
                    <Space
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: 10
                        }}
                    >
                        <Space
                            style={{
                                marginRight: 10
                            }}
                        >
                            <Image
                                width={200}
                                src={selectedBank(item.bankId)}
                                preview={false}
                                style={{
                                    border: '1px solid gray',
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            />
                        </Space>
                        <Space direction='vertical'>
                            <Space
                                style={{
                                    fontSize: 25,
                                    fontWeight: 'bold'
                                }}
                            >
                            {item.iban}
                            </Space>
                        </Space>
                    </Space>
                ))
            }
        </Modal>
    )
}

export default DonationModal