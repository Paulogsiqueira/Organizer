import Axios from "axios";
import { TaskInterface } from "@/interfaces/task";
import { Dispatch, SetStateAction } from 'react';

interface Response {
  data: {
    msg: string;
  };
}

/*---------------- Conexões com o Back ------------------- */
export async function cardColumnCard(idUser: string, inicialColumn: string, finalColumn: string, startIndex: number, endIndex: number) {
  try {
    const response = await Axios.post("https://organizerback.up.railway.app/changeColumnCard", {
      idUser: idUser,
      inicialColumn: inicialColumn,
      finalColumn: finalColumn,
      startIndex: startIndex,
      endIndex: endIndex
    });
    const msg = response.data.msg;

    if (msg === "Alterado") {
      return "Alteração realizada"
    } else {
      return "Alteração inválida"
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}


export const getAllTasksFromUser = async (idUser: string) => {
  try {
    const response = await Axios.post("http://localhost:3001/allTasks", {
      idUser: idUser
    });

    console.log(response)
    const msg = response.data.msg;
    const userInfo = response.data.user;

    if (msg === "Usuário encontrado") {
      return userInfo;
    } else {
      return "Usuário inválido"
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
}

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

export const tasksUserReorder = async (idUser: string, list: string, option: '1' | '2' | '3'): Promise<string> => {
  const endpoints: Record<'1' | '2' | '3', string> = {
    '1': 'https://organizerback.up.railway.app/toDoReorder',
    '2': 'https://organizerback.up.railway.app/doingReorder',
    '3': 'https://organizerback.up.railway.app/doneReorder',
  };

  const endpoint = endpoints[option];

  try {
    const response: Response = await Axios.post(endpoint, {
      idUser,
      [`${getOptionString(option)}String`]: list,
    });

    return response.data.msg;
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    throw error;
  }
};

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

const getOptionString = (option: '1' | '2' | '3'): string => {
  return option === '1' ? 'toDo' : option === '2' ? 'doing' : 'done';
};


/*---------------- Demais funções ------------------- */

export async function getTasks(id: string, ): Promise<void> {
  
}

export async function getTask(id: string,) {

}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
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

export function convertToMinutes(timeStr: string) {
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

