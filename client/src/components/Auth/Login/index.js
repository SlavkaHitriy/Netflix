import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useHttp } from '../../../wrappers/http.hook'
import { getCookie, setCookie } from "../../../wrappers/cookies"
import UserStore from "../../../mobx/user.store"

// Styles
import styles from './index.module.scss'
import mainStyles from "../index.module.scss"

// Login
export default props => {
    const { request } = useHttp()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (getCookie('authToken')) history.push('/')
    }, [])

    const loginUser = async e => {
        e.preventDefault()

        const data = await request(
            '/auth/login',
            'POST',
            JSON.stringify({ email, password }),
            {
                'Content-Type': 'application/json'
            }
        )

        console.log('Data', data)

        if (!data.error) {
            setCookie('authToken', data.token)
            setCookie('userName', data.username)
            UserStore.setIsAuth(true)

            history.push('/')
        } else {
            setError(data.error)

            setTimeout(() => {
                setError('')
            }, 4000)
        }
    }

    return (
        <div className={styles.login}>
            <div className="container">
                <form onSubmit={loginUser} className={mainStyles.form}>
                    <h3 className={styles.loginTitle}>Login</h3>
                    {
                        error && <span className={mainStyles.errorMessage}>{error}</span>
                    }
                    <div className={mainStyles.formGroup}>
                        <input type="email" required id='email' placeholder='Enter email' value={email}
                               onChange={e => setEmail(e.target.value)} tabIndex={1}
                        />
                    </div>
                    <div className={mainStyles.formGroup}>
                        <input type="password" required id='password' placeholder='Enter password' value={password}
                               onChange={e => setPassword(e.target.value)} tabIndex={2}
                        />
                        <Link to='/forgot-password' className={styles.loginForgot} tabIndex={4}>Forgot Password?</Link>
                    </div>

                    <button type='submit' className={mainStyles.btn} tabIndex={3}>
                        Login
                    </button>

                    <div className={mainStyles.text}>
                        <span>Don't have an account?</span>
                        <Link to='/register'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}