import React, { useState } from 'react'
import UserStore from '../../../mobx/user.store'
import { observer } from 'mobx-react'
import { deleteCookie } from "../../../wrappers/cookies"
import { Link, useHistory } from "react-router-dom"

// Subcomponents
import User from './User'

// Styles
import styles from './index.module.scss'

// Images
import logo from '../../../images/logo.svg'

// Header
export default observer(props => {
    const history = useHistory()

    const logout = () => {
        deleteCookie('authToken')
        UserStore.setIsAuth(false)
        history.push('/login')
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerInner}>
                    {
                        UserStore.isAuth ? (
                            <Link className={styles.headerLink} to='/'>
                                <img className={styles.headerLogo} src={logo} alt="logo"/>
                            </Link>
                        ) : <img className={styles.headerLogo} src={logo} alt="logo"/>
                    }
                    {
                        UserStore.isAuth && <User logout={logout} />
                    }
                </div>
            </div>
        </header>
    )
})