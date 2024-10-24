import { useEffect, useState } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import './App.css';
import { API_HOST_HAME } from './general/constants';

import { Header, Column } from './components';
import TaskCard from './components/TaskCard/TaskCard';

type ColumnType = 'todo' | 'inProgress' | 'done';
type Task = {
  taskId: string;
  // Add other task properties here if needed
};

type TasksType = {
  [key in ColumnType]: Task[];
};

const COLUMN_TITLE = {'todo': 'ToDo', 'inProgress': 'In Progress', 'done': 'Done'};
const COLUMNS = ['todo', 'inProgress', 'done'];

const App = () => {
  const [tasks, setTasks] = useState<TasksType>({ todo: [], inProgress: [], done: [] });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    fetch(`${API_HOST_HAME}/users/123/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
  }

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log('Drag ended - over ->', over);
    if (!over) return;
  
    const activeContainer: keyof typeof tasks = active.data.current.sortable.containerId;
    const overContainer: keyof typeof tasks = over.data.current.sortable.containerId;
  
    if (activeContainer === overContainer) {
      // Перемещение внутри одного столбца
      const newOrder = arrayMove(tasks[activeContainer], active.data.current.index, over.data.current.index);
      setTasks((prev) => ({
        ...prev,
        [activeContainer]: newOrder
      }));
    } else {
      // Перемещение между разными столбцами
      const activeItems = [...tasks[activeContainer]];
      const overItems = [...tasks[overContainer]];
  
      // Удаляем элемент из активного контейнера
      const [movedItem] = activeItems.splice(active.data.current.index, 1);
  
      // Если в контейнере нет элементов, вставляем на индекс 0
      const newIndex = overItems.length ? over.data.current.index : 0;
      overItems.splice(newIndex, 0, movedItem);
  
      // Обновляем состояние для обоих контейнеров
      setTasks((prev) => ({
        ...prev,
        [activeContainer]: activeItems,
        [overContainer]: overItems
      }));
    }
  };  

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="App">
        <Header />
        <h2 className='page-title'>Tasks</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          {(COLUMNS as ColumnType[]).map((column) => (
            <SortableContext
              key={column}
              items={tasks[column].map(task => ({ id: task.taskId }))}
              strategy={verticalListSortingStrategy}
              id={column}
            >
              <Column title={COLUMN_TITLE[column]} tasks={tasks[column]} />
            </SortableContext>
          ))}
        </div>
        {/* Используем DragOverlay для визуализации элемента при перетаскивании */}
        <DragOverlay>
          {activeId ? (
            <TaskCard task={tasks.todo.find(task => task.taskId === activeId) ||
                      tasks.inProgress.find(task => task.taskId === activeId) ||
                      tasks.done.find(task => task.taskId === activeId)} />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default App;
