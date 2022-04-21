import { css } from '@linaria/core'
import useLoginForm from './useLoginForm'

const styles = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const LoginForm = () => {
    const {
        emailValue,
        passwordValue,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
    } = useLoginForm()

    return (
        <form onSubmit={handleSubmit} className={styles}>
            <input
                type="email"
                placeholder="Email"
                value={emailValue}
                onChange={handleEmailChange}
                autoComplete="current-email"
            />
            <input
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={handlePasswordChange}
                autoComplete="current-password"
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm
