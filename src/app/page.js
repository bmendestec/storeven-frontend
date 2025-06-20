'use client';

import { useAuth } from "@/hooks/AuthContext";
import { Button, Card, Checkbox, Flex, Form, Input, Spin, theme } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';

export default function Login() {

    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>

                <Content style={{ margin: '0 16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="Sign In" variant="border less" style={{ width: 400 }}>
                        {loading ?
                            <Flex style={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                            </Flex> :
                            <form
                                method="POST"
                                onSubmit={handleSubmit}

                            >
                                <div>
                                    <label>E-mail</label>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label>Password</label>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>

                                <button className="add-button"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>}
                    </Card>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Storage and Vendors Management ©{new Date().getFullYear()} Created by Bruno Mendes
                </Footer>
            </Layout >
        </>
    )
}
