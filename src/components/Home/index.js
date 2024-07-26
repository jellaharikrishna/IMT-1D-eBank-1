import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <div className="home-content">
        <h1 className="home-main-heading">Your Flexibility, Our Excellence</h1>
        <img
          className="digital-card-image"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
