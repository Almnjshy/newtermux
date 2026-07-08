import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: any
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ERROR:', error)
    console.error('INFO:', info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:20, direction:'rtl'}}>
          <h2>حدث خطأ في اللعبة</h2>
          <pre style={{whiteSpace:'pre-wrap'}}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
