'use client';

import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Button, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import {
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import ProtectedRoute from "@/context/ProtectedRoute";

export default function HomeLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const router = useRouter();
    const { logout } = useAuth();

    const items = [
        { key: '/home', label: 'Home', icon: <HomeOutlined /> },
        { key: '/home/usuarios', label: 'Users', icon: <UserOutlined /> },
        { key: '/home/products', label: 'Products', icon: <ProductOutlined /> },
        { key: '/home/settings', label: 'Settings', icon: <SettingOutlined /> }
    ];

    const handleMenuClick = (e) => {
        router.push(e.key);
    }

    return (
        <ProtectedRoute>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    {/* <div className="demo-logo-vertical" /> */}
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['/home']}
                        mode="inline"
                        items={items}
                        style={{
                            marginTop: '20px'
                        }}
                        onClick={handleMenuClick}
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
                            >
                                <LogoutOutlined size={60} />
                            </Button>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px', maxHeight: '1200px' }}>
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Storage and Vendors Management ©{new Date().getFullYear()} Created by Bruno Mendes
                    </Footer>
                </Layout>
            </Layout >
        </ProtectedRoute>
    );
}
