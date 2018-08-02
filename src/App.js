import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Toast from './toast'
import stores from './stores'
import SignIn from './sign-in'
import SignUp from './sign-up'
import Main from './main'
import './icons'

@observer
class App extends Component {
    render() {
        return (
            <Router>
                <Provider stores={stores}>
                    <div className="App">
                        <button
                            type="button"
                            onClick={() => {
                                Toast.info('Hello')
                            }}
                        >点我
                        </button>
                        <Switch>
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Route
                                path="/"
                                render={(props) => {
                                    const { userStore } = stores
                                    userStore.getUserInfo().then((result) => {
                                        console.log(result)
                                        if (!userStore.user.signed) {
                                            props.history.push('/signin')
                                        }
                                    })
                                    return <Main />
                                }}
                            />
                        </Switch>
                    </div>
                </Provider>
            </Router>
        )
    }
}

export default App