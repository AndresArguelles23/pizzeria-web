import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const headerElement = screen.getByText(/mi pizzer\u00EDa/i);
  expect(headerElement).toBeInTheDocument();
});
