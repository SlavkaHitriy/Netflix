import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useHttp } from '../../../wrappers/http.hook'

// Styles
import mainStyles from '../index.module.scss'
import styles from './index.module.scss'

// Reset Password
export default ({resetToken}) => {
    const { request } = useHttp()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const resetPassword = async e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')

            setTimeout(() => {
                setError('')
            }, 5000)

            return setError(`Passwords don't match`)
        }

        const data = await request(
            `/auth/reset-password/${resetToken}`,
            'PUT',
            JSON.stringify({password}),
            {
                'Content-Type': 'application/json'
            }
        )

        console.log('Data', data)

        if (!data.error) {
            setSuccess(data.data)
        } else {
            setError(data.error)

            setTimeout(() => {
                setError('')
            }, 4000)
        }
    }

    return (
        <div className={styles.reset}>
            <div className="container">
                <form
                    onSubmit={resetPassword}
                    className={mainStyles.form}
                >
                    <h3 className={styles.resetTitle}>Reset Password</h3>
                    {error && <span className={mainStyles.errorMessage}>{error} </span>}
                    {success && (
                        <span className={mainStyles.successMessage}>
                        {success}
                            <Link to="/login">Login</Link>
                    </span>
                    )}
                    <div className={mainStyles.formGroup}>
                        <input
                            type="password"
                            required
                            id="password"
                            placeholder="Enter new password"
                            autoComplete="true"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={mainStyles.formGroup}>
                        <input
                            type="password"
                            required
                            id="confirmpassword"
                            placeholder="Confirm new password"
                            autoComplete="true"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={mainStyles.btn}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}