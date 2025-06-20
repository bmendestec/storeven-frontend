'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "./hooks/useUser";
import FormEdit from "./edit/components/form";


export default function Usuarios() {
  const router = useRouter();
  const { fetchUserData, handleDeleteUser } = useUsers();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isShowTable, setIsShowTable] = useState(true);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
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

  useEffect(() => {
    if (!isShowTable) return;
    setIsShowTable(true);
  }, [isShowTable])

  const handleDirectToEdit = (userId) => {
    if (!userId) return;
    router.push(`/home/usuarios/edit/${userId}`);
  }

  return (
    <>
      <div className={`grid-container ${isShowDetail ? 'visible' : 'hidden'}`}>
        <div className={`table-container ${isShowTable ? 'visible' : 'hidden'}`}>
          <button className="add-button" onClick={() => router.push('/home/usuarios/add')}>Add user</button>
          <table>
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
                <tr key={user.id}
                  className={userId === user.id && isShowDetail ? `selected-row` : ''}
                  onDoubleClick={() => {
                    setIsShowForm(true);
                    setUserId(user.id);
                    setIsShowDetail(true);
                  }}>
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
        <div className={`form-container ${isShowForm ? 'visible' : 'hidden'}`}>
          {isShowForm && <FormEdit userId={userId} setIsShowForm={setIsShowForm} setIsShowDetail={setIsShowDetail} />}
        </div>
      </div>
    </>
  );
}
