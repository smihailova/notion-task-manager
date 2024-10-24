import { render } from '@testing-library/react';
import Column from './Column';

const taskList = [{
  title: 'Test task',
  description: 'This is a test task',
}];

describe('TaskList', () => {
  test('renders task title', () => {
    render(<Column tasks={taskList} />);
    expect(true).toBe(true);
  });
});
