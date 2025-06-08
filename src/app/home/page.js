'use client';

import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Button, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import {
    ArrowUpOutlined,
    DesktopOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    SettingOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

export default function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const [openLogin, setOpenLogin] = useState(null);
    const router = useRouter();
    const { isAuth, logout } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            router.push('/login');
        }
    }, [isAuth]);
    return (
        // <Login />
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    // defaultSelectedKeys={['/login']}
                    mode="inline"
                // items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="text"
                            variant="primary"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Button
                            onClick={logout}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        >Logout
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className='d-flex flex-column align-items-center' style={{ margin: '100px' }}>
                        <div className="row justify-content-center">
                            <div className='col-md-4' style={{ height: '110px', width: '120px' }}>
                                <Button
                                    variant='primary'
                                    onClick={() => { router.push('/usuarios') }}>
                                    <UserAddOutlined size={60} />
                                    Users
                                </Button>
                            </div>
                            <div className='col-md-4' style={{ height: '110px', width: '120px' }}>
                                <Button variant='primary'
                                    onClick={() => { router.push('/tasks') }}><ArrowUpOutlined size={60} />Tasks</Button>
                            </div>
                            <div className='col-md-4' style={{ height: '110px', width: '120px' }}>
                                <Button
                                    variant='primary'
                                    onClick={() => { router.push('/test-navbar') }}>
                                    <SettingOutlined size={60} />
                                    Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Storage and Vendors Management ©{new Date().getFullYear()} Created by Bruno Mendes
                </Footer>
            </Layout>
        </Layout >

    );
}
