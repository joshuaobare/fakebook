const Post = (props) => {
    return (
        <div>
            <div>{props.post.userId}</div>
            <div>{props.post.text}</div>
            <div>{props.post.timestamp}</div>
            <div>{props.post.userId}</div>
        </div>
    )
}

export default Post