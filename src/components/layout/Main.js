import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

const Main = ({ children }) => {
    const [visible, setVisible] = useState(false)
    const [sidenavColor, setSidenavColor] = useState("#1890ff")
    const [sidenavType, setSidenavType] = useState("transparent")

    const openDrawer = () => setVisible(!visible)
    const handleSidenavType = (type) => setSidenavType(type)
    const handleSidenavColor = (color) => setSidenavColor(color)

    let { pathname } = useLocation()
    pathname = pathname.replace("/", "")

    return (
        <Layout
            className={'layout-dashboard'}
        >
            <Drawer
                title={false}
                placement= "left"
                closable={false}
                onClose={() => setVisible(false)}
                open={visible}
                key="left"
                width={250}
                className="drawer-sidebar"
            >
                <Layout
                    className="layout-dashboard"
                >
                    <Sider
                        trigger={null}
                        width={250}
                        theme="light"
                        className={`sider-primary ant-layout-sider-primary ${
                            sidenavType === "#fff" ? "active-route" : ""
                        }`}
                        style={{ 
                            background: sidenavType 
                        }}
                    >
                        <Sidenav color={sidenavColor} />
                    </Sider>
                </Layout>
            </Drawer>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                width={250}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${
                    sidenavType === "#fff" ? "active-route" : ""
                }`}
                style={{ background: sidenavType }}
            >
                <Sidenav color={sidenavColor} />
            </Sider>
            <Layout>
                <Affix>
                    <AntHeader 
                        className="ant-header-fixed" >
                        <Header
                            onPress={openDrawer}
                            name={pathname}
                            subName={pathname}
                            handleSidenavColor={handleSidenavColor}
                            handleSidenavType={handleSidenavType}
                        />
                    </AntHeader>
                </Affix>
                <Content className="content-ant">{children}</Content>
                <Footer />
            </Layout>
        </Layout>
    );
}

export default Main;
