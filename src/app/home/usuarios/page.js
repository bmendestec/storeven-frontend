'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "./hooks/useUser";
import './styles/users.css';


export default function Usuarios() {
  const router = useRouter();
  const { fetchUserData, handleDeleteUser } = useUsers();
  const [users, setUsers] = useState([]);
  const [reloadPanel, setReloadPanel] = useState(null)  

  const fetchData = async () => {
    const data = await fetchUserData();
    setUsers(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (!reloadPanel) return;
    setReloadPanel(false);
    fetchData();
  }, [reloadPanel]);

  const handleDirectToEdit = (userId) => {
    if (!userId) return;
    router.push(`/home/usuarios/edit/${userId}`);
  }

  return (
    <>
      <div>
        <button className="add-button" onClick={() => router.push('/home/usuarios/add')}>Add user</button>
      </div>
      <div style={{ maxHeight: "700px", overflowY: "auto" }}>
        <table style={{
          width: '100 %',
          borderCollapse: 'collapse',
          margin: '20px 0',
          fontSize: '16px',
          textAlign: 'left'
        }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Age</th>
              <th>Birh Date</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onDoubleClick={() => handleDirectToEdit(user.id)}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{new Date(user.birth_date).toLocaleDateString('pt-BR')}</td>
                <td>{user.gender}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteUser(user.id, setReloadPanel)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </>
  );
}
