import { tasksUserReorder, reorder, cardColumnCard } from '@/methods/dashboard/dashboardMethods';
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useState, useEffect } from "react";
import { TaskInterface } from '@/interfaces/task';
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import { getTasks } from '@/methods/dashboard/dashboardMethods';
import FormAddTask from './form/FormAddTask';
import Task from './task/Task';
import '@/style/dashboard/dashboard.sass'

const Dashboard = () => {
  const user = useSelector(selectUser)
  const [toDo, setToDo] = useState<TaskInterface[]>([]);
  const [doing, setDoing] = useState<TaskInterface[]>([])
  const [done, setDone] = useState<TaskInterface[]>([])
  console.log("git")

  useEffect(() => {
    getTasks(user.idUser, setToDo, setDoing, setDone);
  }, []);

  function reloadTasks() {
    setTimeout(() => {
      getTasks(user.idUser, setToDo, setDoing, setDone);
    }, 100);
  }
  function addTask(acitivity: string, time: string, criticaly: string, option: "1" | "2" | "3", date: string) {
    let column = option === '1' ? toDo : option === '2' ? doing : done;
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000);
    let newId = (timestamp - randomPart).toString()
    const newTask = {
      id: newId,
      name: acitivity,
      estimatedTime: time,
      criticaly: criticaly,
      deadline: date,
      timeWorked: '00:00'
    }
    const newList = [...column, newTask]
    const listToString = JSON.stringify(newList)
    tasksUserReorder(user.idUser, listToString, option)
    option === '1' ? setToDo(newList) : option === '2' ? setDoing(newList) : setDone(newList);
  }

  async function onDragEnd(result: any) {
    const finalColumn = result.destination.droppableId
    const startColumn = result.source.droppableId
    const startIndex = result.source.index
    const finalIndex = result.destination.index
    console.log("coluna inicial: " + startColumn + typeof(startColumn))
    console.log("Coluna final:" + finalColumn)

    if (!result.destination) {
      return;
    }
    let items = []
    if (startColumn == finalColumn) {
      if (startColumn == '1') {
        items = reorder(toDo, result.source.index, result.destination.index)
        setToDo(items)
      } else if (startColumn == '2') {
        items = reorder(doing, result.source.index, result.destination.index)
        setDoing(items)
      } else {
        items = reorder(done, result.source.index, result.destination.index)
        setDone(items)
      }
      const tasksString = JSON.stringify(items)
      tasksUserReorder(user.idUser, tasksString, result.destination.droppableId)
    } else {
     cardColumnCard(user.idUser,startColumn,finalColumn,startIndex,finalIndex)
    }
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className='dashboard-subtitle'>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <FormAddTask addTask={addTask} />
      <section className='dashboard'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='dashboard-column'>
            <h2>TO DO</h2>
            <Droppable droppableId='1' type='list'>
              {(provided) => (
                <div ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {toDo.map((item, index) =>
                    <Task key={item.id} task={item} index={index} column="toDo" reloadTask={reloadTasks} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className='dashboard-column'>
            <h2>DOING</h2>
            <Droppable droppableId='2' type='list'>
              {(provided) => (
                <div ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {doing.map((item, index) =>
                    <Task key={item.id} task={item} index={index} column="doing" reloadTask={reloadTasks} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className='dashboard-column'>
            <h2>DONE</h2>
            <Droppable droppableId='3' type='list'>
              {(provided) => (
                <div ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {done.map((item, index) =>
                    <Task key={item.id} task={item} index={index} column="done" reloadTask={reloadTasks} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </section>
    </div>
  )
}

export default Dashboard
