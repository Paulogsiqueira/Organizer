import Axios from "axios";

export const cleanMessage = (func: Function, text: string, time: number) => {
    setTimeout(() => {
        func(text);
    }, time);
}

export const userInfo = async  (idUser:string) =>{
    try {
        const response = await Axios.post("http://localhost:3001/userInfo", {
            idUser:idUser
        });

        const msg = response.data.msg;
        const userInfo = response.data.user;

        if (msg === "Usuário encontrado") {
            const matchResult = userInfo.match(/^([^|]+)\|\/\|(.+)$/);
            const email = matchResult[1];
            const name = matchResult[2];
            const userDetails = {
                name: name,
                email: email,
            };

            return userDetails;
        } else {
            return "Usuário inválido"
        }
    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        throw error;
    }
}

export const toDoUser = async  (idUser:string) =>{
    try {
        const response = await Axios.post("http://localhost:3001/toDoUser", {
            idUser:idUser
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


export const toDoUserReorder = async (idUser:string,toDo:string) =>{
    console.log(toDo)
    try {
        const response = await Axios.post("http://localhost:3001/toDoReorder", {
            idUser:idUser,
            toDoString: toDo
        });

        const msg = response.data.msg;
        return msg;

    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        throw error;
    }

}


