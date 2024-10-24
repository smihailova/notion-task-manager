import './Column.css';

import TaskCard from '../TaskCard/TaskCard';

const Column = ({ title, tasks }: any) => {
  return (
    <div style={{ width: '370px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>{title}</h3>
      {tasks.map((task: any) => (
        <TaskCard key={task.taskId} task={task} />
      ))}
    </div>
  );
};

export default Column;
