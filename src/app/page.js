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

    const handleSubmit = async (values) => {
        const { email, password } = values;
        await login(email, password);
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>

                <Content style={{ margin: '0 16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="Sign In" variant="border less" style={{ width: 400 }}>
                        {loading ?
                            <Flex style={{display: 'flex', justifyContent: 'center', margin: '50px'}}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                            </Flex> :
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                onFinish={handleSubmit}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"

                            >
                                <Form.Item
                                    label="Username"
                                    name="email"
                                    autoComplete="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked" label={null}>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>}
                    </Card>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Storage and Vendors Management ©{new Date().getFullYear()} Created by Bruno Mendes
                </Footer>
            </Layout>
        </>
    )
}
