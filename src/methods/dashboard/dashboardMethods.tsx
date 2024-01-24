import Axios from "axios";
import { TaskInterface } from "@/interfaces/task";

interface Response {
    data: {
      msg: string;
    };
  }

/*---------------- Conexões com o Back ------------------- */

export const toDoUser = async (idUser: string) => {
    try {
        const response = await Axios.post("http://localhost:3001/toDoUser", {
            idUser: idUser
        });

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

  export const tasksUserReorder = async (idUser: string, list: string, option: '1' | '2' | '3'): Promise<string> => {
    const endpoints: Record<'1' | '2' | '3', string> = {
      '1': 'http://localhost:3001/toDoReorder',
      '2': 'http://localhost:3001/doingReorder',
      '3': 'http://localhost:3001/doneReorder',
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
  
  const getOptionString = (option: '1' | '2' | '3'): string => {
    return option === '1' ? 'toDo' : option === '2' ? 'doing' : 'done';
  };


/*---------------- Demais funções ------------------- */

export async function getTasks(id: string, setToDo: React.Dispatch<React.SetStateAction<TaskInterface[]>>, setDoing: React.Dispatch<React.SetStateAction<TaskInterface[]>>, setDone: React.Dispatch<React.SetStateAction<TaskInterface[]>>): Promise<void> {
    const userInfo = await toDoUser(id);
    const toDoString = userInfo[0].toDO
    const doingString = userInfo[0].doing
    const doneString = userInfo[0].done

    setToDo(toDoString === null ? [] : JSON.parse(toDoString));
    setDoing(doingString === null ? [] : JSON.parse(doingString));
    setDone(doneString === null ? [] : JSON.parse(doneString));
}

export  async function getTask(id: string, column:string) {
    const userInfo = await toDoUser(id);
    let list = column === 'done' ? userInfo[0].done : column === 'doing' ? userInfo[0].doing : userInfo[0].toDO;

    return list
}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

