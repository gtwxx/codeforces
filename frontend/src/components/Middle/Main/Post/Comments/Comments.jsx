import React from 'react';

const Comments = function ({post}) {
    const renderComment = function (com) {
        return (
            <div className="comment">
                <div className="user">
                    User <b>{com.user.name}</b> wrote a comment
                </div>
                <div className="text">
                    {com.text.split("\n").map((line) => {
                        return (
                            <p className="text-data">
                                {line}
                            </p>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        post.comments.map(renderComment)
    );
};

export default Comments;