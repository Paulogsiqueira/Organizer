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
    const values = Object.values(allTasks as any)
    console.log(values)
    setToDo(values[0] as any)
    setDoing(values[1] as any)
    setDone(values[2] as any)
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
    setTimeout(() => {
      getTasks(user.idUser);
    }, 100);
  }

  const addTaskConcluded = () => {
    setAddTaskModal(true)
    setTimeout(() => {
      setAddTaskModal(false)
    }, 1000);
  }

  const onDragEnd = (result: any) => {
    changeTaskPosition(result.source, result.destination)
    openModal()
    const idWanted = parseInt(user.userIdWanted) > 0 ? user.userIdWanted : user.idUser
    setTimeout(() => {
      getAllTaks(idWanted);
    }, 1000);
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className='dashboard-subtitle'>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <FormAddTask addTaskConcluded={addTaskConcluded} />
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
