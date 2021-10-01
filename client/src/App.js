import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useEffect } from "react"
import { getCookie } from "./wrappers/cookies"
import UserStore from './mobx/user.store'

// Styles
import './styles/general.scss'

// General components
import Header from './components/General/Header'
import Footer from './components/General/Footer'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPassPage from './pages/ForgotPassPage'
import ResetPassPage from './pages/ResetPassPage'

// Home Route with Redirect
const HomeRoute = ({component: HomeComponent, ...rest}) => {
    return (
        <Route {...rest} render={ props =>
            getCookie('authToken') ? <HomeComponent {...props} /> : <Redirect to='/login' />
        } />
    )
}

const App = () => {
    useEffect(() => {
        if (getCookie('authToken')) {
            UserStore.setIsAuth(true)
        } else {
            UserStore.setIsAuth(false)
        }
    }, [])

    return (
        <Router>
            <div className='app'>
                <Header />
                <Switch>
                    <HomeRoute path='/' component={HomePage} exact />
                    <Route path='/login' component={LoginPage} exact />
                    <Route path='/register' component={RegisterPage} exact />
                    <Route path='/forgot-password' component={ForgotPassPage} exact />
                    <Route path='/reset-password/:resetToken' component={ResetPassPage} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App
