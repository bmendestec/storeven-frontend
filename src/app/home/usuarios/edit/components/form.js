'use client';

import './../../styles/users.css';
import { useEdit } from "../hooks/useEdit";

export default function FormEdit({ userId, setIsShowForm, setIsShowDetail }) {
    const { user, formatDate, handleChange, handleSubmit } = useEdit({ userId });
    const birthDate = formatDate(user.birth_date || '');
    const handleSave = async (e) => {
        e.preventDefault();
        await handleSubmit();
    }

    return (
        <>
            <div>
                <button className='close-button'
                    onClick={() => { 
                        setIsShowForm(false);
                        setIsShowDetail(false);
                    }}
                >X</button>
                <form
                    method="post"
                    onSubmit={handleSave}
                >
                    <div>
                        <div className="label">
                            <label>E-mail</label>
                        </div>
                        <input style={{ width: '100%' }} name="email" placeholder="email@example.com" value={user.email} onChange={handleChange} />
                    </div>
                    <div>
                        <div className="label">
                            <label>Full name</label>
                        </div>
                        <input style={{ width: '100%' }} name="name" placeholder="Full name" value={user.name} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <div>
                            <div className="label">
                                <label>Birth date</label>
                            </div>
                            <input style={{ width: '100%' }} type="date" name="birth_date" value={birthDate} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="label">
                                <label>Age</label>
                            </div>
                            <input style={{ width: '100%' }} type="text" name="age" value={user.age} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="radio-group">
                        <label>Gender</label>
                        <div className="radio-group-items">
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <label>Male</label>
                                <label>Female</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <input type="radio" name="gender" value="Masculino" onChange={handleChange} checked={user.gender === "Masculino"} />
                                <input type="radio" name="gender" value="Feminino" onChange={handleChange} checked={user.gender === "Feminino"} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="add-button" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}