import React from 'react';
import {useNavigate} from "react-router-dom";

const Navigation = ({login}) => {

    const router = useNavigate()

    return (
        <nav>
            <ul>
                <li>
                    <a href="" onClick={(event) => {
                        event.preventDefault()
                        router("/", {replace: true})
                    }}>Home</a>
                </li>
                <li><a href="" onClick={(event) => {
                    event.preventDefault()
                    router("/users", {replace: true})
                }}>Users</a></li>
                {login
                    ?
                    <li>
                        <a href="" onClick={(event)=>{
                            event.preventDefault()
                        }}>
                            Write Post
                        </a>
                    </li>
                    : null
                }
                <li><a href="">Posts</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;