'use client';

import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import { useUsers } from "./hooks/useUser";
import {
  DeleteColumnOutlined,
  DeleteFilled,
  UserOutlined,
} from "@ant-design/icons";


export default function Usuarios() {
  const router = useRouter();
  const { isAuth } = useAuth();
  const { fetchUserData } = useUsers();
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [actions, setActions] = useState([]);

  const fetchData = async () => {
    const data = await fetchUserData();
    setUsers(data);

    const filterNames = [...new Set(data.map(user => user.name))];
    const dynamicFilterNames = filterNames.map(name => ({
      text: name,
      value: name
    }));

    const filterEmail = [...new Set(data.map(user => user.email))];
    const dynamicFilterEmails = filterEmail.map(email => ({
      text: email,
      value: email
    }));

    const filterGenders = [...new Set(data.map(user => user.gender))];
    const dynamicFilterGenders = filterGenders.map(gender => ({
      text: gender,
      value: gender
    }));

    setColumns([
      {
        title: '',
        dataIndex: 'id',
        key: 'id',
        responsive: ['md'],
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        responsive: ['lg'],
        filters: dynamicFilterNames,
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '30%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        responsive: ['md'],
        filters: dynamicFilterEmails,
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.email.startsWith(value),
        width: '30%',
      },
      {
        title: 'Birth date',
        dataIndex: 'birth_date',
        key: 'birth_date',
        responsive: ['md'],
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        responsive: ['md'],
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        responsive: ['md'],
        filters: dynamicFilterGenders,
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.gender.startsWith(value),
        width: '30%',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a href="/home">Delete</a>,
      },
    ]);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && !isAuth) {
      router.push('/');
    }
  }, [isAuth]);

  return (
    <Table

      columns={columns}
      dataSource={users}
      style={{
        margin: '50px'
      }}
      onChange={onChange}
    />
  );
}
