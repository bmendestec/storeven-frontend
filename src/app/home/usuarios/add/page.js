'use client';

import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import dayjs from "dayjs";
import { useAdd } from "./hooks/useAdd";
import './../styles/users.css';

export default function AddUser() {
    const { formData, handleChange, handleSubmit } = useAdd();
    const handleSave = async (e) => {
        e.preventDefault();
        await handleSubmit();
        onFormSubmit();
    }

    return (
        <>
            <div style={{
                margin: '100px'
            }}>
                <div className="form-container">
                    <form
                        method="post"
                        onSubmit={handleSave}
                    >
                        <div>
                            <div className="label">
                                <label>E-mail</label>
                            </div>
                            <input style={{ width: '100%' }} name="email" placeholder="email@example.com" value={formData.email || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="label">
                                <label>Full name</label>
                            </div>
                            <input style={{ width: '100%' }} name="fullName" placeholder="Full name" value={formData.fullName || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="label">
                                <label>Password</label>
                            </div>
                            <input style={{ width: '100%' }} type="password" placeholder="Password" name="password" value={formData.password || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="label">
                                <label>Confirm Password</label>
                            </div>
                            <input style={{ width: '100%' }} type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword || ''} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <div>
                                <div className="label">
                                    <label>Birth date</label>
                                </div>
                                <input style={{ width: '100%' }} type="date" name="birth_date" value={formData.birth_date || ''} onChange={handleChange} />
                            </div>
                            <div>
                                <div className="label">
                                    <label>Age</label>
                                </div>
                                <input style={{ width: '100%' }} type="text" name="age" value={formData.age || ''} onChange={handleChange} />
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
                                    <input type="radio" name="gender" value="Masculino" onChange={handleChange} />
                                    <input type="radio" name="gender" value="Feminino" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="add-button" type="submit" onClick={() => { handleSubmit }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}