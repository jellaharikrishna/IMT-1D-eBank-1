import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showErrorMsg: '', isError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = showErrorMsg => {
    this.setState({isError: true, showErrorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, isError, showErrorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="app-card">
          <img
            className="website-login-image"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form
            className="login-form-container"
            onSubmit={this.onSubmitLoginForm}
          >
            <h1 className="welcome-heading">Welcome Back!</h1>
            <div className="input-card">
              <label htmlFor="userId" className="input-label">
                User ID
              </label>
              <input
                id="userId"
                className="input-text"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-card">
              <label htmlFor="pinId" className="input-label">
                PIN
              </label>
              <input
                id="pinId"
                className="input-text"
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onChangePin}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError && <p className="login-error-msg">{showErrorMsg}</p>}
            <p className="user-login-details">
              *User Credentials: User ID: 142420, PIN: 231225
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
