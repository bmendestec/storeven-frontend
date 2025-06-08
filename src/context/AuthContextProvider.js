'use client';

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import apiClient from '../service/server';
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Button, Menu, theme } from "antd";
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

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const [isAuth, setIsAuth] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        const userStored = localStorage.getItem('idUser');
        const tokenStored = localStorage.getItem('authToken');

        if (!tokenStored && !userStored) {
            setUser(null);
            setLoading(false);
            return;
        }
        setUser(userStored);
        setLoading(false);
    }, []);


    const login = async (email, password) => {
        checkToken();
        setLoading(true);
        setUser(null);
        await apiClient.post('/login', {
            email: email,
            password: password,
        }).then(async (response) => {
            if (response.status === 200) {
                const token = response.data.token;
                const idUser = response.data.id;
                if (response.data.message !== 'Invalid credentials') {
                    const { isValid } = await isTokenValid(token);
                    if (isValid) {
                        localStorage.setItem('authToken', token);
                        localStorage.setItem('idUser', idUser);
                        setLoading(false);
                        setUser(idUser);
                        router.push('/home');
                    } else {
                        console.log('Erro ao validar o token. Tente novamente.');
                    }
                } else {
                    alert(response.data.message);
                }
            }
        }).catch((error) => {
            if (error.response.data.message === "Invalid credentials") {
                alert('E-mail ou senha inválidos. Tente novamente.');
            } else {
                alert('Erro ao fazer login. Verifique seu e-mail e senha. ');
            }
        }).finally(() => {
            setLoading(false);
        });

    };

    const checkToken = () => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('idUser');
        if (token && userId) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('idUser');
        }
    }

    const isTokenValid = async (token) => {
        if (!token) {
            return false;
        }

        try {
            const response = await apiClient.get('/validate-token', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.message === true) {
                setIsAuth(true);
            }
            return {
                isValid: response.data.message
            };
        } catch (error) {
            console.error('Erro ao validar o token:', error);
            return false;
        }
    }

    const logout = async () => {
        setLoading(true);
        setUser(null);
        const logginOutRoute = await apiClient.get('/logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        });
        if (logginOutRoute.status !== 200) {
            console.log('Erro ao fazer logout:', logginOutRoute.message);
        } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            setLoading(false);
            router.push('/login');
        }
    };

    return (
        <>
            <AuthContext.Provider value={{ user, login, logout, loading, isAuth }}>
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
                            {children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Storage and Vendors Management ©{new Date().getFullYear()} Created by Bruno Mendes
                        </Footer>
                    </Layout>
                </Layout>
            </AuthContext.Provider>
        </>
    );
}