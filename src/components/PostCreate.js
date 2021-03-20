import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addPost,startGetPosts} from '../actions/postsAction'
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'

class PostCreate extends Component {
    constructor() {
        super()
        this.state = {
            id : '' ,
            title : '',
            body:'' ,
            submit : false
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
     * handler for input feilds
     * @param {*} e 
     */
    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    /**
     * submit handler to create a post
     * @param {*} e 
     */
    handleSubmit = (e) => {
        e.preventDefault()
        const { id , title , body } = this.state
        const obj = { id , title , body }
        this.setState({ submit : true})

        if(obj.id && obj.title && obj.body){
            this.props.dispatch(addPost(obj))
            this.props.history.push('/')
            window.alert('post created sucessfully..!')
        }
    }

    /**
     * function used to check validation
     * @param {*} data 
     * @returns 
     */
    validation = (data) =>{
        return ( this.state.submit && data.length === 0 ) && <small style={{'color' : 'red'}}>*this feild is required</small> 
    }

    render() {
        return (
            <div className='align-form'>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='number'
                        name="id"
                        placeholder='enter id'
                        value={this.state.id}
                        onChange={this.handleChange}
                    />{this.validation(this.state.id)}
                    <br/><br/>
                    

                    <input
                        type='text'
                        name="title"
                        placeholder='enter title'
                        value={this.state.title}
                        onChange={this.handleChange}
                    />{this.validation(this.state.title)}
                    <br/><br/>

                    <textarea
                        name="body"
                        placeholder='enter description'
                        value={this.state.body}
                        onChange={this.handleChange}
                    />{this.validation(this.state.body)}
                    <br/><br/>

                    <Button
                        type='submit'
                        value='create'
                        size="sm"
                    >create</Button>{" "}
                    
                    <Button size="sm"><Link className='link' to={`/`}>Back</Link></Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(PostCreate)