import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useHttp } from '../../../wrappers/http.hook'
import { getCookie, setCookie } from "../../../wrappers/cookies"
import UserStore from "../../../mobx/user.store"

// Styles
import mainStyles from '../index.module.scss'
import styles from './index.module.scss'

// Register
export default props => {
    const { request } = useHttp()
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (getCookie('authToken')) history.push('/')
    }, [])

    const registerUser = async e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')

            setTimeout(() => {
                setError('')
            }, 4000)

            setError(`Passwords don't match`)
            return
        }

        const data = await request(
            '/auth/register',
            'POST',
            JSON.stringify({ username, email, password }),
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
        <div className={styles.register}>
            <div className="container">
                <form onSubmit={registerUser} className={mainStyles.form}>
                    <h3 className={styles.registerTitle}>Register</h3>
                    {
                        error && <span className={mainStyles.errorMessage}>{error}</span>
                    }
                    <div className={mainStyles.formGroup}>
                        <input type="text" required id='name' placeholder='Enter username' value={username}
                               onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={mainStyles.formGroup}>
                        <input type="email" required id='email' placeholder='Enter email' value={email}
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={mainStyles.formGroup}>
                        <input type="password" required id='password' placeholder='Enter password' value={password}
                               onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={mainStyles.formGroup}>
                        <input type="password" required id='confirmPassword' placeholder='Confirm password' value={confirmPassword}
                               onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit' className={mainStyles.btn}>
                        Register
                    </button>

                    <div className={mainStyles.text}>
                        <span>Already have an account?</span>
                        <Link to='/login'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}