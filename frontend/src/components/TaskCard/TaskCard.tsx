import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './TaskCard.css';

const TaskCard = ({ task }: { task: any }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    margin: '4px',
    backgroundColor: isDragging ? '#e0e0e0' : '#f4f4f4',
    touchAction: 'none', 
    borderRadius: '4px',
    border: '1px solid #ddd',
    cursor: 'grab',
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
      onMouseDown={() => console.log('Drag started', task)}
    >
      <div className="card page-card mb-3">
        <div className="card-body">
          <span className="badge text-bg-secondary float-end">
            <i className="bi bi-stars" style={{ fontSize: '1rem', color: 'white' }} />
          </span>
          <h5 className="card-title">{task.title}</h5>
          <p className="card-text">
            <span className="badge bg-warning me-2">{task.priority}</span>
            <span className="badge bg-info">{task.dueDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
