import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import PostShow from './components/PostShow'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'
import './App.css'

class App extends Component {
    render() {
        return (
            <Router>

                <Route path='/' component={PostShow} exact={true}/>
                <Route path='/create' component={PostCreate} />
                <Route path='/edit/:id' component={PostEdit} />

            </Router>

        )
    }
}
export default App