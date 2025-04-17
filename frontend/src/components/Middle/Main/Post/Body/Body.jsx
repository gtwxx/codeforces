import React from 'react';
import {useNavigate} from "react-router-dom";

const Body = ({post}) => {
    const router = useNavigate()

    return (
        <article>
            <div className="title">
                <a href="" onClick={(event) => {
                    event.preventDefault()
                    // router('post_' + post.id)
                }}>{post.title}</a>
            </div>
            <div className="body">
                <div>
                    {post.text.split("\n").map((line) => {
                        return (
                            <p className="text-data">
                                {line}
                            </p>
                        )
                    })}
                </div>
            </div>
            <ul className="attachment">
                <li>Announcement of <a href="#">Codeforces Round #510 (Div. 1)</a></li>
                <li>Announcement of <a href="#">Codeforces Round #510 (Div. 2)</a></li>
            </ul>
            <div className="footer">
                <div className="left">
                    {/*<img src="<@spring.url '/img/voteup.png'/>" title="Vote Up" alt="Vote Up"/>*/}
                    <span className="positive-score">+173</span>
                    {/*<img src="<@spring.url '/img/votedown.png'/>" title="Vote Down" alt="Vote Down"/>*/}
                </div>
                <div className="right">
                    {/*<img src="<@spring.url '/img/date_16x16.png'/>" title="Publish Time" alt="Publish Time"/>*/}
                    {/*<img src="<@spring.url '/img/comments_16x16.png'/>" title="Comments" alt="Comments"/>*/}
                    <a href=""></a>
                    Comments count: {0}
                </div>
            </div>

        </article>
    );
};

export default Body;