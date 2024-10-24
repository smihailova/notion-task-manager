import { render, screen } from '@testing-library/react';
import TaskCard from './TaskCard';

const task = {
  title: 'Test task',
  description: 'This is a test task',
};

describe('TaskCard', () => {
  test('renders task title', () => {
    render(<TaskCard task={task} />);
    const textElement = screen.getByText(task.title);
    expect(textElement).toBeInTheDocument();
  });

  test('renders task description', () => {
    render(<TaskCard task={task} />);
    const textElement = screen.getByText(task.description);
    expect(textElement).toBeInTheDocument();
  });
});
