import Axios from "axios";

export const changeInfo = async (id: any, name: any, email: any, password: any, newPassword: any) => {
    try {
        const response = await Axios.post("http://localhost:3001/editUser", {
            userId: id,
            name: name,
            email: email,
            password: password,
            newPassword: newPassword
        });

        return response.data.msg;
    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        return "Erro ao processar a solicitação";
    }
}

export const userLogin = async (email: any, password: any) => {
    try {
        const response = await Axios.post("http://localhost:3001/login", {
            email: email,
            password: password
        });

        const msg = response.data.msg;
        const userInfo = response.data.user;

        if (msg === "Usuário logado com sucesso!") {
            const matchResult = userInfo.match(/^(\d+)\|\/\|(.+)$/);
            const id = matchResult[1];
            const userDetails = {
                isLogged: true,
                idUser: id,
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


export const userRegister = async (name: any, email: any, password: any, confirmPassword: any) => {
    try {
        const response = await Axios.post("http://localhost:3001/register", {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });

        const msg = response.data.msg;
        return msg;

    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        throw error;
    }

}