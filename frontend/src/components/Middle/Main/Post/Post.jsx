import React, {useState} from 'react';
import axios from "axios";
import Body from "./Body/Body";
import Comments from "./Comments/Comments";
import { useParams } from "react-router-dom";

const Post = ({login}) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    axios.get("/api/post/" + id).then((response) => {
        console.log(response)
        setPost(response.data);
    }).catch((error) => {
        console.log("err")
        console.log(error)
    })

    return (
        post ?
            <>
                <Body post={post}/>
            </>
            : <h1>No such post</h1>)
};

export default Post;