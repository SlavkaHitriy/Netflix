import React from 'react'

// ResetPass page components
import ResetPass from '../components/Auth/ResetPass/'

export default ({ match }) => {
    return (<>
        <main className='main auth'>
            <ResetPass resetToken={match.params.resetToken} />
        </main>
    </>)
}