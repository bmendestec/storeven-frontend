'use client';

import { Table } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

const columns = [
    {
      title: 'Name (all screens)',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age (medium screen or bigger)',
      dataIndex: 'age',
      key: 'age',
      responsive: ['md'],
    },
    {
      title: 'Address (large screen or bigger)',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
  ];

export default function Usuarios() {
    const router = useRouter();
    const { isAuth } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            router.push('/login');
        }
    }, [isAuth]);
    return (
        <Table columns={columns} dataSource={data} />
    );
}
