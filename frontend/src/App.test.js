import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Jest can have trouble with ESM-only packages like react-router-dom v7.
// Mocking the parts used in the App avoids module resolution issues
// while still allowing the component tree to render for this simple test.
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <>{element}</>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useLocation: () => ({ pathname: '/' }),
  Navigate: () => <div />,
}), { virtual: true });

test('renders header title', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const headerElement = screen.getByText(/mi pizzer\u00EDa/i);
  expect(headerElement).toBeInTheDocument();
});
