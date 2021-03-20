import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGetPosts ,removePost,updatepost} from '../actions/postsAction'
import { Table , Spinner , Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {AiFillDelete} from 'react-icons/ai'
import PostEdit from './PostEdit'

class PostShow extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            isEdit : false
        }
    }

    /**
     * lifecycle method to fetch the data from jsonplaceholder
     */
    componentDidMount() {
        if (this.props.posts.length === 0) {
            this.props.dispatch(startGetPosts());
        }
    }

    /**
     * 
     * @param {handler to delete the post} id 
     */
    handleDelete = (id) => {
        const confirm = window.confirm('are you sure , want to delete...!')
        if(confirm){
            this.props.dispatch(removePost(id))
        }
    }

    /**
     * handler to update the post
     * @param {*} obj 
     */
    handleEdit = (obj) => {
        this.props.dispatch(updatepost(obj.id , obj))
    }


    render() {
        return (
            <div className='align-table'><br/>         
                {
                    this.props.posts.length > 0 ? (
                        <>
                        <Button className='align' size="sm">
                            <Link className='link' to={`/create`}>create</Link>
                        </Button>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.posts.sort((a,b) => a.id - b.id).map((post,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{post.id}</td>
                                                <td>{post.title}</td>
                                                <td>{post.body}</td>
                                                <td>
                                                    <PostEdit handleEdit={this.handleEdit} data={post}/>
                                                    <AiFillDelete onClick={()=>{this.handleDelete(post.id)}} />
                                                </td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </Table>
                        <small style={{'color':'red'}}>Due to absence of backend , the data won't persists for PUT and POST ( for page reload )</small>
                        </>
                    ) : <h6 align='center'><Spinner animation="border"  size="sm"/>Loading...</h6>
                }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(PostShow)