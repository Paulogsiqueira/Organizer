import { Draggable } from '@hello-pangea/dnd';
import '@/style/dashboard/task/task.sass'

interface TaskProps {
    task: {
      id: string;
      name: string;
    },
    index:number
  }

const Task = ({ task , index}: TaskProps) => {
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
            <div className='dashboard-item'
            {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <p>{task.name}</p>
            </div>
        )}
      </Draggable>
      );
}

export default Task