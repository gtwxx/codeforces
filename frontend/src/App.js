import './App.css';
import Enter from "./components/Middle/Main/Enter/Enter";
import Index from "./components/Middle/Main/Index/Index";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Application from "./Application";
import axios from "axios";
import Users from "./components/Middle/Main/Users/Users";
import NotFound from "./components/Middle/Main/NotFound/NotFound";
import Register from "./components/Middle/Main/Register/Register";
import Post from "./components/Middle/Main/Post/Post";

function App() {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        axios.get("/api/posts").then((response)=>{
            setPosts(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, []);

    const [login, setLogin] = useState(null)
    useEffect(() => {
        if (localStorage.getItem("jwt")){
            axios.get("/api/jwt", {
                params: {
                    jwt: localStorage.getItem("jwt")
                }
            }).then((response)=>{
                localStorage.setItem("login", response.data.login);
                setLogin(response.data.login)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        index={true}
                        element={<Application setLogin={setLogin} login={login} posts={posts} page={<Index posts={posts}/>}/>}
                    />
                    <Route
                        exact path={'/enter'}
                        element={<Application login={login} posts={posts} page={<Enter setLogin={setLogin}/>}/>}
                    />
                    <Route
                        exact path={'/register'}
                        element={<Application login={login} posts={posts} page={<Register setLogin={setLogin}/>}/>}
                    />
                    <Route
                        exact path={'/users'}
                        element={<Application login={login} posts={posts} page={<Users login={login} />}/>}
                    />
                    <Route
                        exact path={'/post/:id'}
                        element={<Application login={login} posts={posts} page={<Post login={login} />}/>}
                    />
                    <Route
                        exact path={'/*'}
                        element={<Application posts={posts} page={<NotFound  />}/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
