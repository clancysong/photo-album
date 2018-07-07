import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './sign-in.css'

@inject('stores')
@observer
class SignIn extends Component {
    constructor() {
        super()
        this.state = { name: '', password: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.jumpToSignUpPage = this.jumpToSignUpPage.bind(this)
    }

    handleChange(event) {
        const { target } = event
        this.setState(...this.state, { [target.name]: target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        if (!this.state.name || !this.state.password) return
        const store = this.props.stores.userStore
        store.signIn(this.state).then((result) => {
            console.log(result)
            if (result.status > 0) {
                this.props.history.push('/')
            }
        })
    }

    jumpToSignUpPage() {
        this.props.history.push('/signup')
    }

    render() {
        return (
            <div className="sign-in">
                <form className="clearfix" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-user" />
                        </svg>
                        <input type="text" name="name" id="name" placeholder="请输入用户名" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-lock" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="请输入密码" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <button className="signinBtn">登录</button>
                    <button className="signupBtn" onClick={this.jumpToSignUpPage}>没有账号？现在注册！</button>
                </form>
            </div>
        )
    }
}

export default SignIn