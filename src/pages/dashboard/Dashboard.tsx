import '@/style/dashboard/dashboard.sass'
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Task from './task/Task';
import { tasksUserReorder, biggestId , reorder} from '@/methods/dashboard/dashboardMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { TaskInterface } from '@/interfaces/task';
import { getTasks} from '@/methods/dashboard/dashboardMethods';
import FormAddTask from './form/FormAddTask';

const Dashboard = () => {
  const user = useSelector(selectUser)
  const [toDo, setToDo] = useState<TaskInterface[]>([]);
  const [doing, setDoing] = useState<TaskInterface[]>([])
  const [done,setDone] = useState<TaskInterface[]>([])

  useEffect(() => {
    getTasks(user.idUser,setToDo,setDoing,setDone);
  }, []);

  function reloadTasks(){
    setTimeout(() => {
      getTasks(user.idUser,setToDo,setDoing,setDone);
      
    }, 100);
  }
  function addTask(acitivity: string, time:string,criticaly:string,option: "1" | "2" | "3", date:string) {
    let column = option === '1' ? toDo : option === '2' ? doing : done;
    const id = biggestId(column)
    let newId = (id + 1).toString()
    const newTask = {
      id: newId,
      name: acitivity,
      estimatedTime: time,
      criticaly: criticaly,
      deadline:date,
      timeWorked:'00:00'
    }
    console.log(newTask);
    const newList = [...column, newTask]
    const listToString = JSON.stringify(newList)
    tasksUserReorder(user.idUser, listToString,option)
    option === '1' ? setToDo(newList) : option === '2' ? setDoing(newList) : setDone(newList);
  }

  function onDragEnd(result: any) {
    const column = result.destination.droppableId
    if (!result.destination) {
      return;
    }
    let items = []
    if(column == '1'){
      items = reorder(toDo, result.source.index, result.destination.index)
      setToDo(items)
    }else if(column == '2'){
      items = reorder(doing, result.source.index, result.destination.index)
      setDoing(items)
    }else{
      items = reorder(done, result.source.index, result.destination.index)
      setDone(items)
    }
    const tasksString = JSON.stringify(items)
    tasksUserReorder(user.idUser, tasksString, result.destination.droppableId)
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className='dashboard-subtitle'>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <FormAddTask addTask={addTask}/>
      <section className='dashboard'>
        <div className='dashboard-column'>
          <h2>TO DO</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='1' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {toDo.map((item, index) =>
                      <Task key={item.id} task={item} index={index} column="toDo" reloadTask={reloadTasks}/>
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
            <Droppable droppableId='2' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {doing.map((item, index) =>
                      <Task key={item.id} task={item} index={index} column="doing" reloadTask={reloadTasks} />
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
            <Droppable droppableId='3' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {done.map((item, index) =>
                      <Task key={item.id} task={item} index={index} column="done" reloadTask={reloadTasks}/>
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