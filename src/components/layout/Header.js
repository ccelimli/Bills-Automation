import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Button, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GrLogout } from "react-icons/gr"; 
import { FaUser, FaUserPlus } from "react-icons/fa"; 
import { TiThMenu } from "react-icons/ti"
import { ImKey } from "react-icons/im"

const Header = ({ name, subName, onPress }) => {
  const [formattedName, setFormattedName] = useState(name)
  const [ isUser, setIsUser ] = useState(false)
  const currentUser = useSelector((state) => state.user.getUser?.data?.data)
  const { Text } = Typography
  const navigate = useNavigate()

  //console.log(isUser);

  useEffect(() => {
    window.scrollTo(0, 0)
    setFormattedName(name.replace("/", ""))

    currentUser?.firstName !== undefined ?
      setIsUser(true)
      :
      setIsUser(false)
  }, [name, currentUser, isUser])

  const items = [
    {
      title: <NavLink to="/">Pages</NavLink>
    },
    {
      title: formattedName
    }
  ]

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb
            items={items}
          />
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
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
                    Üye Ol
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
