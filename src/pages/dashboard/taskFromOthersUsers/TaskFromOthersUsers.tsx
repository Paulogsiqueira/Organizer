import { getUsers } from "@/methods/others/othersMethods";
import { useEffect, useState } from "react";
import '@/style/dashboard/taskFromOthersUsers/taskFromOthersUsers.sass'
import { TaskFromOtherUsersProps } from "@/interfaces/task";
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'

const TaskFromOtherUsers: React.FC<TaskFromOtherUsersProps> = ({ changeIdUser }) => {
    const [allUsers, setAllUsers] = useState([{ idName: "Carregando..." }])
    const user = useSelector(selectUser)

    const getAllUsers = async () => {
        const users = await getUsers();
        setAllUsers(users)
    };
    useEffect(() => {
        getAllUsers();
    }, [])

    const setWantedUser = (id: string) => {
        id = id === '0' ? user.idUser : id;
        changeIdUser(id)
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