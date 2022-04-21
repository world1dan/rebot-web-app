import { useState } from 'react'

const useLoginForm = () => {
    const [passwordValue, setPasswordValue] = useState('')
    const [emailValue, setEmailValue] = useState('')

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(`Email: ${emailValue} Password: ${passwordValue}`)
    }

    return {
        emailValue,
        passwordValue,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
    }
}

export default useLoginForm
