'use client';

import { useParams } from "next/navigation";
import { useEdit } from "../hooks/useEdit";
import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import dayjs from "dayjs";

export default function EditUser() {
    const params = useParams();
    const userId = params.userId;
    const { user, formatDate, handleChange, handleSubmit } = useEdit({ userId });
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
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <Form.Item label="Name">
                        <Input value={user.name} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="E-mail">
                        <Input value={user.email} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Birth date/Age">
                        <Space>
                            <DatePicker value={dayjs(birthDate)} onChange={handleChange} />
                            <Input value={user.age} onChange={handleChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item label="Gender">
                        <Radio.Group value={user.gender} onChange={handleChange} > 
                            <Radio value="Masculino">Male</Radio>
                            <Radio value="Feminino">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={() => {handleSubmit}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}