import React, { useEffect, useState } from 'react';
import api from '../api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default UserList;
