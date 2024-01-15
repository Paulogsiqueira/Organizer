import '@/style/dashboard/dashboard.sass'
import { useState, useEffect, ChangeEvent } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Task from './task/Task';
import { toDoUser, toDoUserReorder } from '@/methods/others/othersMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'

interface Task {
  id: string;
  name: string;
}

const Dashboard = () => {
  const user = useSelector(selectUser)
  const [newTask,setNewTask] = useState('')
  const [selectValue, setSelectValue] = useState('1');
  const [toDo, setToDo] = useState<Task[]>([]);
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

  async function getToDo(): Promise<void> {
    const userInfo = await toDoUser('1');
    const toDoString = userInfo[0].toDO
    const toDoObject = (JSON.parse(toDoString));
    setToDo(toDoObject)
  }

  useEffect(() => {
    getToDo();
  }, []);

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    const items = reorder(toDo, result.source.index, result.destination.index)
    setToDo(items)
    const toDoString = JSON.stringify(items)
    console.log(items)
    toDoUserReorder(user.idUser, toDoString)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value); 
  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  function addTask(option: string, task: string) {
    let column = []
    if(option == '1'){
      column = toDo
    }else if(option == '2'){
      column = doing
    }else{
      column = done
    }

    const id = biggestId(column)
    let newId = (id + 1).toString()
    const newTask = {
      id: newId,
      name: task,
    }
    const list = column
    const newList = [...list, newTask]
    const listToString = JSON.stringify(newList)
    toDoUserReorder(user.idUser, listToString)
    setToDo(newList)
  
  }

  function biggestId(list: Array<Task>){
    let maiorId: number = -1;
    list.forEach((objeto:Task) => {
      const idAtual: number = parseInt(objeto.id, 10); // Converte o id para número
      if (idAtual > maiorId) {
        maiorId = idAtual;
      }
    });
    return maiorId

  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Organize suas tarefas para conseguir gerenciar melhor o seu tempo</p>
      <div className='dashboard-input'>
        <input type="text" placeholder='Digite a atividade que deseja adicionar' onChange={handleInputChange}/>
        <select
        value={selectValue}
        onChange={handleSelectChange}
        >
          <option value='1'>To Do</option>
          <option value='2'>Doing</option>
          <option value='3'>Done</option>
        </select>
        <button type="submit" onClick={() => addTask(selectValue, newTask)}>Adicionar Tarefa</button>
      </div>
      <section className='dashboard'>
        <div className='dashboard-column'>
          <h2>TO DO</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks' type='list' direction='vertical'>
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  <ul>
                    {toDo.map((item, index) =>
                      <Task key={index} task={item} index={index} />
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