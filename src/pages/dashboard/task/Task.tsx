import { Draggable } from '@hello-pangea/dnd';
import '@/style/dashboard/task/task.sass'
import deleteButton from '/dashboard/delete.png';
import editButton from '/dashboard/edit.png';


interface TaskProps {
  task: {
    id: string;
    name: string;
  },
  index: number,
  column: string
}

const Task = ({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className='dashboard-item'
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='task-button'>
            <div className='edit-button'>
              <img src={editButton} alt="edit button" />
            </div>
            <div className='delete-button'>
              <img src={deleteButton} alt="delete button" />
            </div>
          </div>
          <p>{task.name}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Task