import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useHttp } from '../../wrappers/http.hook'
import { deleteCookie, getCookie } from "../../wrappers/cookies"

// Styles
import styles from './index.module.scss'

// Home
export default props => {
    const { request } = useHttp()
    const history = useHistory()

    const [error, setError] = useState('')
    const [isAuthorized, setIsAuthorized] = useState(false)

    const fetchPrivateData = async () => {
        const data = await request(
            '/private',
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('authToken')}`
            }
        )

        console.log('Data', data)

        if (data.error) {
            deleteCookie('authToken')
            setError('You are not authorized. Please ')
        } else {
            setIsAuthorized(true)
        }
    }

    useEffect(() => {
        if (!getCookie('authToken')) history.push('/login')

        fetchPrivateData()
    }, [])

    useEffect(async () => {
        if (isAuthorized) {
            const data = await fetch('https://api.tvmaze.com/shows/')

            console.log('Fetched data', data)
        }
    }, [isAuthorized])

    return (
        error ? <span className={styles.errorMessage}>{error} <Link className={styles.toLogin} to='/login'>login</Link></span> : (
            <>

            </>
        )
    )
}