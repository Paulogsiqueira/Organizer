import Axios from "axios";
import { FormDataEdit, position } from "@/interfaces/task";


/*---------------- Conexões com o Back ------------------- */

export const getCompletedTasks = async (userId: string) => {
  try {
    const response = await Axios.post("http://localhost:3001/getCompletedTasks", {
      userId: userId
    });

    const completedtasks = response.data.tasks;
    console.log(completedtasks)
    // if (userInfo[0].completedTasks == null || userInfo[0].completedTasks == "") {
    //   return '{"inTime":0,"outTime":0,"extraMinutes":0,"payedMinutes":0}'
    // } else {
    //   return userInfo[0].completedTasks
    // }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}

export const addTimeWorked = async (timeWorked: string, taskId: string) =>{
  try {
    const response = await Axios.post("http://localhost:3001/addTimeWorked", {
      taskId: taskId,
      timeWorked: timeWorked
    });
    const msg = response.data.tasks
    return msg;
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}

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

export const addTask = async (title:string,estimatedTime:string,criticaly: string,column:string,deadline:string,userId:string,type:string) =>{
  try {
    const response = await Axios.post("http://localhost:3001/addTask", {
      title: title,
      userId:userId,
      column:column,
      estimatedTime:estimatedTime,
      criticaly: parseInt(criticaly),
      deadline:deadline,
      type:parseInt(type)
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
      deadline: data.deadline,
      type: data.type
    });  
    return response;
  } catch (error) {
    console.error("Erro ao editar Task: ", error);
    throw error;
  }

}

export const changeTaskStatus = async (taskId:number, situation: number) =>{
  try {
    const response = await Axios.post("http://localhost:3001/changeTaskStatus", {
      taskId : taskId,
      situation : situation
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
  if(destination != null) {
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

}

export const convertToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes > 1 ? totalMinutes : 0
}




