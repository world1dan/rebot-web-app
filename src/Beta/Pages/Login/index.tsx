import { useState } from 'react'
import { css } from '@linaria/core'

import LoginForm from './LoginForm'

const styles = css`
    background-color: var(--bg2);
    height: 400px;
    border-radius: 14px;
    border: 1.5px solid var(--borders);
    padding: 10px;
`

const Login = () => {
    return (
        <div className={styles}>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login
