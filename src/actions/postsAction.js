import axios from 'axios'

//set posts
export const setPosts = (posts) =>{
    return { type:'SET_POSTS' , payload: posts}
}

//delete post
export const removePost = (id) =>{
    return { type : 'DELETE_POSTS' , payload : id}
}

//add post
export const addPost = (post) => {
    return { type : 'ADD_POST' , payload : post}
}

//update post
export const updatepost = (id,obj) => {
    return { type : 'UPDATE_POST' , payload : {id,obj}}
}

//get posts
export const startGetPosts = () => {
    return (dispatch) => {
        axios.get('http://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            const posts = response.data.slice(0,10)
            dispatch(setPosts(posts))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

