import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import popupCard from '../popup-card'
import Toast from '../../components/toast'
import './user-card.css'

@inject('stores')
@observer
class UserCard extends Component {
    constructor() {
        super()
        this.state = { isChanged: false, userInfo: {} }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { target } = event
        const { userInfo } = this.state
        if (target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = (event1) => {
                this.setState({ isChanged: true, userInfo: { ...userInfo, [target.name]: event1.target.result } })
                this.avatarImage.src = event1.target.result
            }
            reader.readAsDataURL(target.files[0])
        } else {
            this.setState({ isChanged: true, userInfo: { ...userInfo, [target.name]: target.value } })
        }
    }

    checkEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
    }

    handleSubmit() {
        const { stores: { userStore } } = this.props
        const { userInfo } = this.state
        userStore.modifyUserInfo(userInfo).then((result) => {
            if (result.status > 0) {
                Toast.success('用户信息已保存')
                this.setState({ isChanged: false })
            }
        })
    }

    render() {
        const { isChanged } = this.state
        const { stores: { userStore: { user: { avatar, name, description, phone, email } } } } = this.props
        return (
            <div className="user-card">
                <label htmlFor="avatar-input" className="avatar-label">
                    <div className="avatar">
                        <img src={avatar} alt="" ref={(e) => { this.avatarImage = e }} />
                    </div>
                </label>
                <input type="file" accept="image/*" name="avatar" id="avatar-input" className="avatar-input" onChange={this.handleChange} />
                <input type="text" className="name" name="name" defaultValue={name} onChange={this.handleChange} />
                <textarea rows="3" maxLength="40" type="text" className="description" name="description" defaultValue={description} onChange={this.handleChange} onKeyDown={this.checkEnter} />
                <label htmlFor="phone" className="phone-label">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-mobile" />
                    </svg>
                    <input type="text" className="phone" name="phone" defaultValue={phone} onChange={this.handleChange} />
                </label>
                <label htmlFor="email" className="email-label">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-mail" />
                    </svg>
                    <input type="text" className="email" name="email" defaultValue={email} onChange={this.handleChange} />
                </label>
                {isChanged ? <button type="button" className="save" onClick={this.handleSubmit}>保存</button> : ''}
            </div>
        )
    }
}

export default popupCard(UserCard)