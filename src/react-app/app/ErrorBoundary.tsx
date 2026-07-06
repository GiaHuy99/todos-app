import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App failed to render:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '24px',
            background: '#010102',
            color: '#f7f8f8',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '20px', marginBottom: '8px' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#8a8f98', marginBottom: '16px' }}>
              The app failed to load. Try a hard refresh or redeploy the latest
              build.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: '#5e6ad2',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
