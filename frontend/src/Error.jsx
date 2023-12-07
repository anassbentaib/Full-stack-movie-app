import React, { Component } from 'react';
import EmptyState from './ui/EmptyState';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <EmptyState
        color='#000'
          title="Uh Oh"
          subtitle="Something went wrong! Please try again later."
        />
      );
    }

    return this.props.children;
  }
}

export default Error;
