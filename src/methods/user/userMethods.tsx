import Axios from "axios";

export const changeInfo = async (id: string, name: string, email: string, password: string, newPassword: string) => {
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

export const userLogin = async (email: string, password: string) => {
    try {
        const response = await Axios.post("http://localhost:3001/login", {
            email: email,
            password: password
        });

        const msg = response.data.msg;
        const userInfo = response.data.user;

        if (msg === "Usuário logado com sucesso!") {
            const matchResult = userInfo.match(/^(\d+)\|\/\|(.+)\|\/\/\|(\d+)$/);
            const id = matchResult[1];
            const access = matchResult[3];
            const userDetails = {
                isLogged: true,
                idUser: id,
                accessLevel: access
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

export const userRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
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

