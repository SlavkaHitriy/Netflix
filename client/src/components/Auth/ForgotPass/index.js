import React, { useState, useEffect } from 'react'
import { useHttp } from '../../../wrappers/http.hook'

// Styles
import mainStyles from '../index.module.scss'
import styles from './index.module.scss'

// Forgot Password
export default props => {
    const { request } = useHttp()

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const forgotPasswordRequest = async e => {
        e.preventDefault()

        const data = await request(
            '/auth/forgot-password',
            'POST',
            JSON.stringify({email}),
            {
                'Content-Type': 'application/json'
            }
        )

        console.log('Data', data)

        if (!data.error) {
            setSuccess(data.data)

            setTimeout(() => {
                setSuccess('')
            }, 4000)
        } else {
            setError(data.error)
            setEmail('')

            setTimeout(() => {
                setError('')
            }, 4000)
        }
    }

    return (
        <div className={styles.forgot}>
            <div className="container">
                <form onSubmit={forgotPasswordRequest}
                      className={mainStyles.form}>
                    <h3 className={styles.forgotTitle}>Forgot Password</h3>
                    {error && <span className={mainStyles.errorMessage}>{error}</span>}
                    {success && <span className={mainStyles.successMessage}>{success}</span>}
                    <div className={mainStyles.formGroup}>
                        <p className={styles.forgotText}>
                            Please enter the email address you register your account with. We
                            will send you reset password confirmation to this email
                        </p>
                        <input type="email" required id="email" placeholder="Email address" value={email}
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={mainStyles.btn}>
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    )
}