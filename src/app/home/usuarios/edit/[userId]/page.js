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
                <div className="w-full max-w-md px-4">
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <Form.Item label="Name">
                            <Input name="name" value={user.name} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="E-mail">
                            <Input name="email" value={user.email} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Birth date/Age">
                            <Space>
                                <DatePicker name="birth_date" value={dayjs(birthDate)} onChange={handleChange} />
                                <Input name="age" value={user.age} onChange={handleChange} />
                            </Space>
                        </Form.Item>
                        <Form.Item label="Gender">
                            <Radio.Group name="gender" value={user.gender} onChange={handleChange} >
                                <Radio value="Masculino">Male</Radio>
                                <Radio value="Feminino">Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => { handleSubmit }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </form>
                </div>
            </div>
        </>
    )
}