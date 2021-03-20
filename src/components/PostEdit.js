import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button , Modal } from 'react-bootstrap'
import { MdModeEdit} from 'react-icons/md'

class PostEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.data.id,
            title: props.data.title,
            body: props.data.body,
            submit: false,
            isEdit: false
        }
    }

    /**
     * lifecycle method to update state once props changed from parent
     * @param {*} prevProps 
     */
    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            this.setState({
                id: this.props.data.id,
                title: this.props.data.title,
                body: this.props.data.body,
            })
        }
    }

    /**
     * handler to open modal
     */
    handleModal = () => {
        this.setState((prev) => {
            return {
                isEdit: !prev.isEdit
            }
        })
    }

    /**
     * function used to check validation
     * @param {*} data 
     * @returns 
     */
    validation = (data) => {
        return (this.state.submit && data.length === 0) && <small style={{ 'color': 'red' }}>*this feild is required</small>
    }

    /**
     * handler to pass the edited data to the parent component 
     * @param {*} e 
     */
    handleSubmit = (e) => {
        e.preventDefault()
        const { id, title, body } = this.state
        const obj = { id, title, body }
        this.setState({ submit: true })

        if (obj.id && obj.title && obj.body) {
            this.props.handleEdit(obj)
            this.setState({ isEdit: false })
        }
    }

    /**
     * handler for input feilds
     * @param {*} e 
     */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                <MdModeEdit onClick={this.handleModal} />
                {
                    this.state.isEdit && (
                        <Modal show={this.state.isEdit} onHide={this.handleModal}>
                            <Modal.Body>
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        type='number'
                                        name="id"
                                        readOnly
                                        placeholder='enter id'
                                        value={this.state.id}
                                    />{this.validation(this.state.id)}
                                    <br /><br />


                                    <input
                                        type='text'
                                        name="title"
                                        placeholder='enter title'
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />{this.validation(this.state.title)}
                                    <br /><br />

                                    <textarea
                                        name="body"
                                        placeholder='enter description'
                                        value={this.state.body}
                                        onChange={this.handleChange}
                                    />{this.validation(this.state.body)}
                                    <br /><br />

                                    <Button type='submit' value='edit' size="sm">edit</Button>{" "}
                                    <Button onClick={this.handleModal} size="sm">close</Button>
                                </form>
                            </Modal.Body>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

export default connect()(PostEdit)