import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })
    console.error('🔴 ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fef2f2', padding: '2rem', fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{
            maxWidth: '600px', width: '100%', background: 'white', borderRadius: '16px',
            border: '1px solid #fecaca', padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              ⚠️ Something went wrong
            </h2>
            <p style={{ color: '#991b1b', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <details style={{ marginBottom: '1rem' }}>
              <summary style={{ cursor: 'pointer', color: '#6b7280', fontSize: '0.75rem' }}>
                Stack trace
              </summary>
              <pre style={{
                background: '#f9fafb', padding: '1rem', borderRadius: '8px', fontSize: '0.7rem',
                overflow: 'auto', maxHeight: '300px', marginTop: '0.5rem', color: '#374151',
              }}>
                {this.state.error?.stack}
                {'\n\nComponent Stack:'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button
              onClick={() => { this.setState({ hasError: false, error: null, errorInfo: null }) }}
              style={{
                background: '#dc2626', color: 'white', border: 'none', padding: '0.5rem 1.5rem',
                borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
