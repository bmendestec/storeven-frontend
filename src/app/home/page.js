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

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '/login', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

export default function Home({ children }) {
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
    );
}
