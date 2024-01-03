import '@/style/dashboard/dashboard.sass'
import { useCallback, useReducer } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

const onDragEnd = (result: any) => {

}

const Dashboard = () => {
  const tasks = [
    { id: "1a2b", title: "Primeira Tarefa" },
    { id: "3c4d", title: "Segunda Tarefa" },
    { id: "123", title: "Terceira Tarefa" },
    { id: "124", title: "Quarta Tarefa" },
    { id: "12432", title: "Quinta Tarefa" },
    { id: "12", title: "Sexta Tarefa" }
  ];

  const jobs = [
    { id: "111", title: "Primeira Tarefa" },
    { id: "222", title: "Segunda Tarefa" },
    { id: "3333", title: "Terceira Tarefa" }
  ];


  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <section className='dashboard'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='tasks' type='list' direction='vertical'>
            {(provided) => (
              <article ref={provided.innerRef} {...provided.droppableProps}>
                <ul>
                  {tasks.map((task, index) =>
                    <li key={task.id}>{task.title}</li>
                  )}
                </ul>
              </article>
            )}
          </Droppable>
        </DragDropContext>

      </section>
    </div>
  )
}

export default Dashboard