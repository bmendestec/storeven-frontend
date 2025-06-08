'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import { Button, Flex, Splitter, Switch, Typography } from "antd";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Content } from "antd/es/layout/layout";

const Desc = props => (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
            {props.text}
        </Typography.Title>
    </Flex>
);

export default function Home() {
    const router = useRouter();
    const { isAuth, user } = useAuth();
    const [sizes, setSizes] = useState(['50%', '50%']);
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        if (!isAuth) {
            router.push('/');
        }
    }, [isAuth]);

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    return (
        <>
            <div>
                <h1>Welcome to Home {user}</h1>
            </div>
            <Flex vertical gap="midle">
                <Splitter
                    onResize={setSizes}
                    style={{
                        height: 200,
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Splitter.Panel size={sizes[0]} resizable={enabled}>
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                            maxHeight={100}
                            minHeight={100}
                        >
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey={data.value}
                                    startAngle={180}
                                    endAngle={0}
                                    data={data}
                                    cx={50}
                                    cy={50}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Splitter.Panel>
                    <Splitter.Panel size={sizes[1]}>
                        <Desc text="Second" />
                    </Splitter.Panel>
                </Splitter>
                <Flex gap="midle" justify="space-between">
                    <Switch
                        value={enabled}
                        onChange={() => setEnabled(!enabled)}
                        checkedChildren="Enable"
                        unCheckedChildren="Disabled"
                    />
                    <Button onClick={() => setSizes(['50%', '50%'])}>Reset</Button>
                </Flex>
            </Flex>
        </>
    );
}
