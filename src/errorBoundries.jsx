import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // ✅ Corrected state initialization
  }

  // ✅ Update state when an error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // ✅ Log error details
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
