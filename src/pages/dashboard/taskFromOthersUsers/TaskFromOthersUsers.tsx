import { getUsers } from "@/methods/others/othersMethods";
import { useEffect, useState } from "react";
import { wantedUser } from "@/redux/sliceUser";
import { useDispatch } from "react-redux";
import '@/style/dashboard/taskFromOthersUsers/taskFromOthersUsers.sass'

const TaskFromOtherUsers = () => {
    const [allUsers, setAllUsers] = useState([{ idName: "Carregando..." }])
    const dispatch = useDispatch()

    const getAllUsers = async () => {
        const users = await getUsers();
        setAllUsers(users)
    };
    useEffect(() =>{
        getAllUsers();
    },[])
    
    const setWantedUser = (id: string) => {
        dispatch(wantedUser({userIdWanted:id}))
        console.log(id)
    }
    return (
        <div>
            <div className="taskFromOthersUsers">
                <h3>Visualizar dashboard do usuario:</h3>
                <select onChange={(e) => setWantedUser(e.target.value)}>
                    <option value="0">Próprio Dashboard</option>
                    {allUsers.map((user, index) => {
                        const match = user.idName.match(/^\s*(\d+)\s*-/);
                        const value = match ? match[1] : '21'
                        return <option key={index} value={value} >{user.idName}</option>
                    })
                    }

                </select>
            </div>
        </div>
    )
}

export default TaskFromOtherUsers