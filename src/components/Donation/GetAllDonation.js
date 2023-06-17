import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Space, Typography } from "antd"
import { getAnimalShelters, getFoundations } from "../../redux/animalShelterSlice"
import { useDispatch } from "react-redux"
import DonationModal from "./DonationModal"

const GetAllDonation = ({ selected }) => {
  const [modalStates, setModalStates] = useState([])
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const { Title } = Typography

  useEffect(() => {

    if (selected === 'animalShelters') {
      dispatch(getAnimalShelters())
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          if (response?.payload?.success) {
            setData(response.payload.data);
            setModalStates(response.payload.data.map(() => false))
          } else {
            throw new Error(response.payload.message)
          }
        } else {
          throw new Error("Get All Animal Shelters Request Failed")
        }
      })
      .catch((err) => {
        console.error(err)
      })
    } 

    if (selected === 'foundations') {
      dispatch(getFoundations())
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          if (response?.payload?.success) {
            setData(response.payload.data);
            setModalStates(response.payload.data.map(() => false))
          } else {
            throw new Error(response.payload.message)
          }
        } else {
          throw new Error("Get All Animal Shelters Request Failed")
        }
      })
      .catch((err) => {
        console.error(err)
      })
    }

  }, [dispatch, setData, selected])

  const handleOpenModal = (index) => {
    const updatedModalStates = [...modalStates]
    updatedModalStates[index] = true
    setModalStates(updatedModalStates)
  }

  const handleCloseModal = (index) => {
    const updatedModalStates = [...modalStates]
    updatedModalStates[index] = false
    setModalStates(updatedModalStates)
  }

  const getRandomColorCode = () => {
    const colorCodes = ["#ffda59", "#a3fff8", "#a1acba", "#ff6a51", "#1d6087", "#a097d5", "#61854a"];
    const randomIndex = Math.floor(Math.random() * colorCodes.length);
    return colorCodes[randomIndex]
  }

  return (
    <>
      <div className="layout-content">
        {
          <Row gutter={[24, 24, 24, 24]}>
            {data.map((item, index) => (
              <>
                <Col
                  span={24}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  style={{
                    marginBottom: 25,
                  }}
                  key={item.id}
                >
                  <Card
                    bordered={false}
                    className="criclebox h-full"
                    style={{
                      border: "1px solid gray"
                    }}
                  >
                    <Title
                      level={4}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        backgroundColor: getRandomColorCode(),
                        margin: 0,
                        padding: "5px 10px",
                        borderRadius: 10
                      }}
                    >
                      { selected === 'animalShelters' ? item?.animalShelterName : item?.name }
                    </Title>
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20
                      }}
                    >
                      <Button
                        type="primary"
                        style={{
                          color: "white",
                          border: "none",
                          backgroundColor: "#738291" // button rengi
                        }}
                        onClick={() => handleOpenModal(index)} 
                      >
                        Bağış Yap
                      </Button>
                    </Space>
                  </Card>
                </Col>
                <DonationModal
                  openModal={modalStates[index]} 
                  setOpenModal={() => handleCloseModal(index)}
                  recordId={selected === 'foundations' ? item.id : null}
                  bankId={item.bankId}
                />
              </>
            ))}
          </Row>
        }
      </div>
    </>
  );
};

export default GetAllDonation;
