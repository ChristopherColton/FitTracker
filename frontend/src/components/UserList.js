import React, { useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';

/*Redunant file at the moment but kept for future use if i implement a admin dash for user info*/

function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/users').then(response => {
                setUsers(response.data);   
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul style= {{ listStyleType: 'none', padding: 0 }}>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.username}</strong> - ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default UserList;
