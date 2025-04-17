import React, {useEffect, useState} from 'react';
import axios from "axios";

const Users = ({login}) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            {login ?
                <div className="users datatable">
                    <div className="caption">User</div>
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Login</th>
                            <th>Creation Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            return <tr>
                                <td className="id">{user.id}</td>
                                <td className="login">{user.login}</td>
                                <td className="creationTime">{user.creationTime}</td>
                            </tr>
                        })}

                        </tbody>
                    </table>
                </div>
            :
            <h1>You must be authorized to view this page</h1>}
        </>

    );
};

export default Users;