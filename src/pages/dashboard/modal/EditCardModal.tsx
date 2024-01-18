import Modal from 'react-modal';
import '@/style/dashboard/modal/editCardModal.sass'
import { TaskInterface } from '@/interfaces/task';
import { getTask, tasksUserReorder } from '@/methods/dashboard/dashboardMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { useState } from 'react';


interface ModalErrorProps {
    modalErrorIsOpen: boolean,
    closeModal: () => void;
    task: TaskInterface,
    column: string,
    reloadTask: () => void
}


const EditCardModal = ({ closeModal, modalErrorIsOpen, task, column,reloadTask }: ModalErrorProps) => {
    const user = useSelector(selectUser)
    const [activity, setActivity] = useState(task.name)

    async function changeTask() {
        const list = await getTask(user.idUser, column)
        const arrayList = JSON.parse(list)
        const newList = arrayList.map((item: TaskInterface) =>
            item.id === task.id ? { ...item, name: activity } : item
        );
        let option = column === 'done' ? '3' : column === 'doing' ? '2' : '1';
        const listToString = JSON.stringify(newList)
        tasksUserReorder(user.idUser, listToString,option)
        closeModal()
        reloadTask()

    }
    return (
        <div>
            <Modal
                isOpen={modalErrorIsOpen}
                onRequestClose={closeModal}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-title'>
                        <p>Editar Card</p>
                    </div>
                    <div className='modal-form'>
                        <label>Atividade:
                            <input type='text' value={activity} onChange={(e) => (setActivity(e.target.value))} />
                        </label>

                    </div>

                    <button onClick={() => changeTask()} className='modal-btn'>Salvar Alterações</button>
                </div>
            </Modal>
        </div>
    )
}

export default EditCardModal