'use client';

import { useParams } from "next/navigation";
import { useEdit } from "../hooks/useEdit";
import { DatePicker, Form, Input, Radio, Space } from "antd";
import dayjs from "dayjs";

export default function EditUser() {
    const params = useParams();
    const userId = params.userId;
    const { user, formatDate } = useEdit({ userId });
    const birthDate = formatDate(user.birth_date || '');

    return (
        <>
            <div style={{
                margin: '100px'
            }}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Name">
                        <Input value={user.name} />
                    </Form.Item>
                    <Form.Item label="E-mail">
                        <Input value={user.email} />
                    </Form.Item>
                    <Form.Item label="Birth date/Age">
                        <Space>
                            <DatePicker value={dayjs(birthDate)} />
                            <Input value={user.age} />
                        </Space>
                    </Form.Item>
                    <Form.Item label="Gender">
                        <Radio.Group value={user.gender}>
                            <Radio value="Masculino">Male</Radio>
                            <Radio value="Feminino">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}