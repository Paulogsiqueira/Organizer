import { changeInfo } from "../user/userMethods";

export const validForm = async (id : any,name: any,email: any,password: any,newPassword: any,confirmNewPassword:any) => {
    let msg = ""

    if(newPassword != "" && confirmNewPassword != ''){
        if(newPassword == confirmNewPassword){
            msg = await changeInfo(id,name,email,password,newPassword);
            return msg
        }else{
            return ("Senha e confirmação devem ser iguais")
            
        }
    }else if((newPassword != "" && confirmNewPassword == "") || (newPassword == "" && confirmNewPassword != "" )){
        return ("Preencha corretamente a senha e confirmação")
        
    }else{
        msg = await changeInfo(id,name,email,password,newPassword);
        return msg
        
    }
}