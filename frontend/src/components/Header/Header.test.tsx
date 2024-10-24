import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders title', () => {
  render(<Header />);
  const textElement = screen.getByText(/AI Task Manager/i);
  expect(textElement).toBeInTheDocument();
});
