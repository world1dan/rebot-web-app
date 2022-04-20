import React, { Component, ReactNode } from 'react'

import FatalError from './FatalError'

export interface IErrorBoundaryProps {
    children: ReactNode
    onError: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface IErrorBoundaryState {
    hasError: boolean
    errorDescription?: string
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            hasError: true,
            errorDescription: error.toString() + errorInfo.componentStack,
        })

        if (this.props.onError) {
            this.props.onError(error, errorInfo)
        }
    }

    render() {
        if (this.state.hasError)
            return <FatalError errorDescription={this.state.errorDescription} />

        return this.props.children
    }
}

export default ErrorBoundary
