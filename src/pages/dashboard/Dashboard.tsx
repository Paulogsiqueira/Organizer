import '@/style/dashboard/dashboard.sass'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useCallback, useReducer} from "react";

const Dashboard = () => {
    const tasks = [
        { id: "1a2b", title: "Primeira Tarefa" },
        { id: "3c4d", title: "Segunda Tarefa" },
        { id: "123", title: "Terceira Tarefa" },
        { id: "124", title: "Quarta Tarefa" }
    ];

    const days = [
      { id: "111", title: "Primeira Tarefa" },
      { id: "222", title: "Segunda Tarefa" },
      { id: "3333", title: "Terceira Tarefa" },
      { id: "4444", title: "Quarta Tarefa" }
  ];

    const reducer = (state: any, action: any) => {
      switch (action.type) {
        case "MOVE": {
          if (!action.to) return state;
          if (action.to === action.from && action.toIndex === action.fromIndex) return state;
    
          const newState = JSON.parse(JSON.stringify(state.data));
          const [removeItem] = newState.splice(action.fromIndex, 1);
          newState.splice(action.toIndex, 0, removeItem);
          return { data: newState };
        }
        default:
          return state;
      }
    };

    const [ state, dispatch ] = useReducer(reducer, { tasks });

    const onDragEnd = useCallback((result: any) => {
        if (result.reason === "DROP") return;
        dispatch({
            type: "MOVE",
            from: result.source.droppableId,
            to: result.destination.droppableId,
            fromIndex: result.source.index,
            toIndex: result.destination.index,
        });
    }, []);

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
            <div className='dashboard'>
                <DragDropContext onDragEnd={onDragEnd}>


                    <Droppable
                        droppableId="tasks"
                        type="TODO">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {tasks?.map((task, index) => (
                                    <Draggable
                                        draggableId={task.id}
                                        index={index}
                                        key={task.id}
                                        >
                                        {(provided) => {
                                            console.log("Task ID:", task.id);
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <div>{task.title}</div>
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {days?.map((day, index) => (
                                    <Draggable
                                        draggableId={day.id}
                                        index={index+10}
                                        key={day.id}
                                        >
                                        {(provided) => {
                                            console.log("day ID:", day.id);
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <div>{day.title}</div>
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>


                        )}

                    </Droppable>
                  
                    <div className='dashboard-column'>
                        <h3>FINISHED</h3>
                        <ul>

                        </ul>
                    </div>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Dashboard