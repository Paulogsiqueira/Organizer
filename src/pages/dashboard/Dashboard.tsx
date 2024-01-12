import '@/style/dashboard/dashboard.sass'
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Task from './task/Task';
import { toDoUser, toDoUserReorder } from '@/methods/others/othersMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(selectUser)

  async function getToDo(): Promise<void> {
    const userInfo = await toDoUser('1');
    const toDoString = userInfo[0].toDO
    const toDoObject = (JSON.parse(toDoString));
    setToDo(toDoObject)
  }

  useEffect(() => {
    getToDo();
  }, []);

  const [toDo, setToDo] = useState([])

  const [doing] = useState([
    {
      id: '1',
      name: 'teste'
    }
  ])

  const [done] = useState([{
    id: '1',
    name: 'teste'
  }])


  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  function onDragEnd(result: any) {
    // result.source.index     => Posição inicial
    // result.destination.index     => Posição final
    if (!result.destination) {
      return;
    }

    const items = reorder(toDo, result.source.index, result.destination.index)
    console.log(items)
    setToDo(items)
    const toDoString = JSON.stringify(toDo)
    toDoUserReorder(user.idUser, toDoString)
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <section className='dashboard'>
        <div className='dashboard-column'>
          <h2>TO DO</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {toDo.map((item, index) =>
                      <Task key={item.id} task={item} index={index} />
                    )}
                  </ul>
                  {provided.placeholder}
                </article>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className='dashboard-column'>
          <h2>DOING</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {doing.map((item, index) =>
                      <Task key={item.id} task={item} index={index} />
                    )}
                  </ul>
                  {provided.placeholder}
                </article>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className='dashboard-column'>
          <h2>DONE</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {done.map((item, index) =>
                      <Task key={item.id} task={item} index={index} />
                    )}
                  </ul>
                  {provided.placeholder}
                </article>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    </div>
  )
}

export default Dashboard