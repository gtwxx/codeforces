import React, {useMemo} from 'react';
import Body from "../Post/Body/Body";

const Index = ({posts}) => {
    const sortedPosts = useMemo(() => {
        if (!posts)
            return []
        return posts.sort((a, b) => b.id - a.id)
    }, [posts])
    return (
        sortedPosts.map((post) => {
            return <Body post={post}/>
        })
    );
};

export default Index;