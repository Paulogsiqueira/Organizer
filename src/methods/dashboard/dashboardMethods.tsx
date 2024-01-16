import Axios from "axios";
import { TaskInterface } from "@/interfaces/task";

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


export const tasksUserReorder = async (idUser: string, list: string, option: string) => {
    if (option == "1") {
        try {
            const response = await Axios.post("http://localhost:3001/toDoReorder", {
                idUser: idUser,
                toDoString: list
            });

            const msg = response.data.msg;
            return msg;

        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            throw error;
        }
    } else if (option == "2") {
        try {
            const response = await Axios.post("http://localhost:3001/doingReorder", {
                idUser: idUser,
                doingString: list
            });

            const msg = response.data.msg;
            return msg;

        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            throw error;
        }
    } else {
        try {
            const response = await Axios.post("http://localhost:3001/doneReorder", {
                idUser: idUser,
                doneString: list
            });

            const msg = response.data.msg;
            return msg;

        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            throw error;
        }
    }

}


/*---------------- Demais funções ------------------- */

export async function getTasks(id: string, setToDo: React.Dispatch<React.SetStateAction<TaskInterface[]>>, setDoing: React.Dispatch<React.SetStateAction<TaskInterface[]>>, setDone: React.Dispatch<React.SetStateAction<TaskInterface[]>>): Promise<void> {
    const userInfo = await toDoUser(id);
    const toDoString = userInfo[0].toDO
    const doingString = userInfo[0].doing
    const doneString = userInfo[0].done

    if (toDoString == null) {
        setToDo([])
    } else {
        const toDoObject = (JSON.parse(toDoString));
        setToDo(toDoObject)
    }

    if (doingString == null) {
        setDoing([])
    } else {
        const doingObject = (JSON.parse(doingString));
        setDoing(doingObject)
    }

    if (doneString == null) {
        setDone([])
    } else {
        const doneObject = (JSON.parse(doneString));
        setDone(doneObject)
    }

}

export function biggestId(list: Array<TaskInterface>) {
    let maiorId: number = -1;
    list.forEach((objeto: TaskInterface) => {
        const idAtual: number = parseInt(objeto.id, 10);
        if (idAtual > maiorId) {
            maiorId = idAtual;
        }
    });
    return maiorId

}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

