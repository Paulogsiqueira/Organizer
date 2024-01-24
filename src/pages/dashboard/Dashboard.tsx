import '@/style/dashboard/dashboard.sass'
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Task from './task/Task';
import { tasksUserReorder, reorder, getTask } from '@/methods/dashboard/dashboardMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { TaskInterface } from '@/interfaces/task';
import { getTasks } from '@/methods/dashboard/dashboardMethods';
import FormAddTask from './form/FormAddTask';

const Dashboard = () => {
  const user = useSelector(selectUser)
  const [toDo, setToDo] = useState<TaskInterface[]>([]);
  const [doing, setDoing] = useState<TaskInterface[]>([])
  const [done, setDone] = useState<TaskInterface[]>([])

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
    let newId = (timestamp-randomPart).toString()
    console.log(newId);
    const newTask = {
      id: newId,
      name: acitivity,
      estimatedTime: time,
      criticaly: criticaly,
      deadline: date,
      timeWorked: '00:00'
    }
    console.log(newTask);
    const newList = [...column, newTask]
    const listToString = JSON.stringify(newList)
    tasksUserReorder(user.idUser, listToString, option)
    option === '1' ? setToDo(newList) : option === '2' ? setDoing(newList) : setDone(newList);
  }

  async function onDragEnd(result: any) {
    console.log(result)
    const finalColumn = result.destination.droppableId
    const startColumn = result.source.droppableId
    console.log(startColumn + ' ' + finalColumn)
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
      let inicialColumn = startColumn === '1' ? 'toDo' : startColumn === '2' ? 'doing' : 'done'
      let endColumn = finalColumn === '1' ? 'toDo' : finalColumn === '2' ? 'doing' : 'done'

      let startList = await getTask(user.idUser, inicialColumn)
      let startArray = JSON.parse(startList)
      let movedTask = startArray.splice(result.source.index, 1)
      const listToString = JSON.stringify(startArray)
      tasksUserReorder(user.idUser, listToString, startColumn)
      startColumn === '1' ? setToDo(startArray) : startColumn === '2' ? setDoing(startArray) : setDone(startArray);

      let endList = await getTask(user.idUser, endColumn)
      let endArray = JSON.parse(endList)
      endArray.splice(result.destination.index, 0, movedTask[0])
      const finalListToString = JSON.stringify(endArray)
      tasksUserReorder(user.idUser, finalListToString, finalColumn)
      finalColumn === '1' ? setToDo(endArray) : finalColumn === '2' ? setDoing(endArray) : setDone(endArray);
      console.log(endArray)


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