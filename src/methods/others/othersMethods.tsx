import Axios from "axios";

export const cleanMessage = (func: Function, text: string, time: number) => {
    setTimeout(() => {
        func(text);
    }, time);
}

export const userInfo = async  (idUser:string) =>{
    try {
        const response = await Axios.post("https://organizerback.up.railway.app/userInfo", {
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

export const getUsers = async () =>{
    try {
        const response = await Axios.post("https://organizerback.up.railway.app/getUsers");

        const msg = response.data.msg;
        const users = response.data.user;

        if (msg === "Usuários encontrados!") {
            return users
        } else {
            return "Usuários não encontrados"
        }
    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        throw error;
    }
}
