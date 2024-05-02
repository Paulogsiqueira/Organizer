import { changeTaskPosition, getTasks } from '@/methods/dashboard/dashboardMethods';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState, useEffect } from "react";
import { TaskInterface } from '@/interfaces/task';
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import ChangeColumnModal from './modal/ChangeColumnModal';
import FormAddTask from './form/FormAddTask';
import Task from './task/Task';
import '@/style/dashboard/dashboard.sass'
import AddTaskSomeoneModal from './modal/AddTaskSomeoneModal';
import TaskFromOtherUsers from './taskFromOthersUsers/TaskFromOthersUsers';

const Dashboard = () => {
  const user = useSelector(selectUser)
  const [toDo, setToDo] = useState<TaskInterface[]>([]);
  const [doing, setDoing] = useState<TaskInterface[]>([])
  const [done, setDone] = useState<TaskInterface[]>([])
  const [modalChangeColumnIsOpen, setModalChangeColumnIsOpen] = useState(false)
  const [addTaskModal, setAddTaskModal] = useState(false)

  useEffect(() => {
    const idWanted = parseInt(user.userIdWanted) > 0 ? user.userIdWanted : user.idUser
    getAllTaks(idWanted);
  }, [user.userIdWanted]);

  const getAllTaks = async (id: string) => {
    const allTasks = await getTasks(id)
    if (allTasks === undefined) {
      setToDo([])
      setDoing([])
      setDone([])
    } else {
      const values = Object.values(allTasks as TaskInterface)
      setToDo(values[0] as TaskInterface[])
      setDoing(values[1] as TaskInterface[])
      setDone(values[2] as TaskInterface[])
    }

  }

  const openModal = () => {
    setModalChangeColumnIsOpen(true)
    setTimeout(() => {
      setModalChangeColumnIsOpen(false)
    }, 2000);
  }

  const closeModal = (type: string) => {
    if (type == "Change Column") {
      setModalChangeColumnIsOpen(false)
    } else {
      setAddTaskModal(false)
    }
  }

  const reloadTasks = () => {
    const userWanted = user.userIdWanted
    const ownId = user.idUser
    let idReload = ''
    if (parseInt(userWanted) > 0) {
      idReload = userWanted
    } else {
      idReload = ownId
    }
    setTimeout(() => {
      getAllTaks(idReload);
    }, 100);
  }

  const showModalAddTask = () => {
    setAddTaskModal(true)
    setTimeout(() => {
      setAddTaskModal(false)
      reloadTasks()
    }, 1000);
  }

  const onDragEnd = (result: any) => {
    const initialPosition = result.source.index
    const initialColumn = result.source.droppableId
    if (result.destination != null) {
      const endPosition = result.destination.index
      const endColumn = result.destination.droppableId
      let dragTask = {} as TaskInterface
      let index = 0
      let columnInitial = initialColumn == 1 ? toDo : initialColumn == 2 ? doing : done
      let columnFinal = endColumn == 1 ? toDo : endColumn == 2 ? doing : done

      index = columnInitial.findIndex(task => task.position === initialPosition);
      dragTask = columnInitial.splice(index, 1)[0]

      index = columnFinal.findIndex(task => task.position === endPosition);
      if (index == -1) {
        index = columnFinal.length
      }
      columnFinal.forEach((task, position) => {
        position >= index ? task.position += 1 : ''
      })
      columnFinal.splice(index, 0, dragTask);

      changeTaskPosition(result.source, result.destination)
    }
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className='dashboard-subtitle'>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <FormAddTask showModalAddTask={showModalAddTask} userId={user.idUser} />
      {parseInt(user.accessLevel) > 1 ? <TaskFromOtherUsers /> : null}
      <section className='dashboard'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='dashboard-column'>
            <h2>TO DO</h2>
            <Droppable droppableId='1' type='list'>
              {(provided) => (
                <div ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {toDo.map((item) =>
                    <Task key={item.task_id} task={item} column="toDo" reloadTask={reloadTasks} />
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
                  {doing.map((item) =>
                    <Task key={item.task_id} task={item} column="doing" reloadTask={reloadTasks} />
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
                  {done.map((item) =>
                    <Task key={item.task_id} task={item} column="done" reloadTask={reloadTasks} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </section>
      <ChangeColumnModal modalChangeColumnIsOpen={modalChangeColumnIsOpen} />
      <AddTaskSomeoneModal modalAddTaskSomeoneIsOpen={addTaskModal} closeModal={closeModal} />
    </div>
  )
}

export default Dashboard
