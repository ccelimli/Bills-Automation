import React, { useEffect, useState } from "react"
import { Row, Col, Button, Space, Typography } from "antd"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GrLogout } from "react-icons/gr"
import { FaUser, FaUserPlus } from "react-icons/fa"
import { TiThMenu } from "react-icons/ti"
import { ImKey } from "react-icons/im"

const Header = ({ name, subName, onPress }) => {
  const [ isUser, setIsUser ] = useState(false)
  const currentUser = useSelector((state) => state.user.getUser?.data?.data)
  const { Text } = Typography
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)

    currentUser?.firstName !== undefined ?
      setIsUser(true)
      :
      setIsUser(false)
  }, [name, currentUser, isUser])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  const convertSubNameToTR = (subName) => {
    if (subName === 'bills') {
      return 'Fatura Yardımı'
    } else if (subName === 'donation') {
      return 'Bağış'
    } else if (subName === 'educationSupport') {
      return 'Eğitim Destek'
    } else if (subName === 'petFoodSupport') {
      return 'Mama Destek'
    } else {
      return 'Anasayfa'
    }
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {convertSubNameToTR(subName)}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
            icon={ <TiThMenu/> }
          />

          {
              isUser ? (
              <>
                <Button
                  type="link"
                  onClick={logout}
                >
                  <GrLogout 
                    style={{
                      marginLeft: 10
                    }}
                  />
                </Button>
                <Space
                    style={{
                      display: 'flex',
                      justifyContent:'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: 'auto',
                      height: '35px',
                      border: '1px solid gray',
                      padding: '0 10px',
                      borderRadius: 10
                    }}
                  >
                    <Space>
                      <FaUser 
                        style={{
                          marginBottom: '3px'
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold'
                        }}
                      >
                        { currentUser?.firstName + ' ' + currentUser?.lastName }
                      </Text>
                    </Space>
                  </Space>
              </>
            )
            : 
            <>
              <Space
                style={{
                  display: 'flex',
                  justifyContent:'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: 'auto',
                  height: '35px',
                  border: '1px solid gray',
                  padding: '0 10px',
                  borderRadius: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('sign-up')}

              >
                <Space>
                  <FaUserPlus 
                    style={{
                      marginBottom: '3px'
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    Kayıt Ol
                  </Text>
                </Space>
              </Space>
              <Space
                style={{
                  display: 'flex',
                  justifyContent:'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: 'auto',
                  height: '35px',
                  border: '1px solid gray',
                  padding: '0 10px',
                  borderRadius: 10,
                  marginRight: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('sign-in')}
              >
                <Space>
                  <ImKey 
                    style={{
                      marginBottom: '3px'
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    Giriş Yap
                  </Text>
                </Space>
              </Space>
            </>
          }
        </Col>
      </Row>
    </>
  );
}

export default Header;
