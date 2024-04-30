import Axios from "axios";
import { FormDataEdit, TaskInterface, position } from "@/interfaces/task";
import { Dispatch, SetStateAction } from 'react';

/*---------------- Conexões com o Back ------------------- */

export const getCompletedTasks = async (idUser: string) => {
  try {
    const response = await Axios.post("https://organizerback.up.railway.app/getCompletedTasks", {
      idUser: idUser
    });

    const userInfo = response.data.user;

    if (userInfo[0].completedTasks == null || userInfo[0].completedTasks == "") {
      return '{"inTime":0,"outTime":0,"extraMinutes":0,"payedMinutes":0}'
    } else {
      return userInfo[0].completedTasks
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}

export const setCompletedTasks = async (idUser: string, completedTasks: string) => {
  try {
    const response = await Axios.post("https://organizerback.up.railway.app/setCompletedTasks", {
      idUser: idUser,
      completedTasks: completedTasks
    });

    const msg = response.data.msg
    console.log(msg);
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}


export const addTaskSomeone = async (idUser: string, task: TaskInterface, option: '1' | '2' | '3') => {
  try {
    const response = await Axios.post("https://organizerback.up.railway.app/addTaskSomeone", {
      idUser: idUser,
      task: task,
      option: option
    });
    const msg = response.data.msg
    return msg;
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
};

export const getTasks = async (id: string, ): Promise<void> => {
  try {
    const response = await Axios.post("http://localhost:3001/allTasks", {
      userId: id
    });
    const msg = response.data.tasks
    return msg;
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}

export const addTask = async (title:string,estimatedTime:string,criticaly: string,column:string,deadline:string,userId:string) =>{
  try {
    const response = await Axios.post("http://localhost:3001/addTask", {
      title: title,
      userId:userId,
      column:column,
      estimatedTime:estimatedTime,
      criticaly: criticaly,
      deadline:deadline
    });
    
    return response;
  } catch (error) {
    console.error("Erro ao adicionar Task: ", error);
    throw error;
  }
}

export const changeTask = async(data: FormDataEdit , taskId: string) =>{
  console.log(data.estimatedTime)
  try {
    const response = await Axios.post("http://localhost:3001/changeTask", {
      taskId: taskId,
      title: data.activity,
      timeWorked: data.timeWorked,
      estimatedTime: data.estimatedTime,
      criticaly: data.criticaly,
      deadline: data.deadline   
    });  
    return response;
  } catch (error) {
    console.error("Erro ao editar Task: ", error);
    throw error;
  }

}

export const deleteTask = async (taskId:number) =>{
  try {
    const response = await Axios.post("http://localhost:3001/deleteTask", {
      taskId : taskId
    });
    
    return response;
  } catch (error) {
    console.error("Erro ao deletar Task: ", error);
    throw error;
  }
}


export const changeTaskPosition = async (start : position,destination:position) => {
  const initialPosition = start.index
  const initialColumn = start.droppableId
  const endPosition = destination.index
  const endColumn = destination.droppableId
  try {
    const response = await Axios.post("http://localhost:3001/changeTaskPosition", {
      initialPosition: initialPosition,
      initialColumn: initialColumn,
      endPosition: endPosition,
      endColumn:  endColumn
    });
    
    return response;
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}


export const compareAndSetDeadlineHours = (estimated: string, worked: string, setDeadlineHours: Dispatch<SetStateAction<string>>) => {
  const minuEstimated = convertToMinutes(estimated.replace(/\s/g, ""))
  const minuWorked = convertToMinutes(worked)
  console.log(minuEstimated, minuWorked)
  if (minuEstimated > minuWorked) {
    setDeadlineHours('in-time')
  } else {
    setDeadlineHours('out-time')
  }
}

export const convertToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes > 1 ? totalMinutes : 0
}

export const compareAndSetDeadlineDate = (taskDate: string, setDeadlineDate: Dispatch<SetStateAction<string>>) => {
  const currentDate = new Date();
  const inputDateObj = new Date(taskDate);

  if (inputDateObj < currentDate) {
    setDeadlineDate("out-time")
  } else {
    setDeadlineDate("in-time")
  }
}

export const deadLineDatePassed = (taskDate: string) => {
  const currentDate = new Date();
  const inputDateObj = new Date(taskDate);

  if (inputDateObj < currentDate) {
    return true
  } else {
    return false
  }
}

export const updateCompletedTasks = async (idUser: string, deadline: string, workedTime: string, estimatedTime: string) => {
  const currentCompletedTasks = await getCompletedTasks(idUser)
  let obCurrentCompletedTasks = JSON.parse(currentCompletedTasks)
  const minutesWorked = convertToMinutes(workedTime)
  const minutesEstimated = convertToMinutes(estimatedTime)
  const deadlinePassed = deadLineDatePassed(deadline)
  if (deadlinePassed) {
    obCurrentCompletedTasks.outTime += 1
  } else {
    obCurrentCompletedTasks.inTime += 1
  }

  if (minutesWorked < minutesEstimated) {
    obCurrentCompletedTasks.payedMinutes += minutesWorked
  } else {
    obCurrentCompletedTasks.payedMinutes += minutesEstimated
    obCurrentCompletedTasks.extraMinutes += (minutesWorked - minutesEstimated)
  }
  console.log(obCurrentCompletedTasks)
  const newCompletedTasks = JSON.stringify(obCurrentCompletedTasks)
  setCompletedTasks(idUser, newCompletedTasks)
}

