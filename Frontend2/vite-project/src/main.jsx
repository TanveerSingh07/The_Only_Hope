// main.jsx — App entry point.
// BrowserRouter wraps everything so React Router works.
// StrictMode gives extra warnings in development (good for catching bugs).

import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Catches any render errors and shows them instead of a blank screen
class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) return (
      <div style={{ padding: 40, color: "#f87171", fontFamily: "monospace", background: "#05030e", minHeight: "100vh" }}>
        <h2 style={{ marginBottom: 16 }}>💥 Runtime Error</h2>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>{this.state.error.message}</pre>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 11, color: "#475569", marginTop: 12 }}>{this.state.error.stack}</pre>
      </div>
    )
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)