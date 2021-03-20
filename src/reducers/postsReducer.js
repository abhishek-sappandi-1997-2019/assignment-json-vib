const postsReducer = (state = [] ,action) => {
    switch(action.type){
        case 'SET_POSTS':{
            return [...action.payload]
        }
        case 'ADD_POST' : {
            return [...state , action.payload]
        }
        case 'DELETE_POSTS' : {
            return state.filter(post => post.id !== action.payload)
        }
        case 'UPDATE_POST' : {
            return state.map((post)=>{
                if(post.id === action.payload.id){
                    return {...post ,...action.payload.obj}
                }else
                {
                    return {...post}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}
export default postsReducer