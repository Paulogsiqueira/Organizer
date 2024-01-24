import Modal from 'react-modal';
import '@/style/dashboard/modal/editCardModal.sass'
import { TaskInterface } from '@/interfaces/task';
import { getTask, tasksUserReorder } from '@/methods/dashboard/dashboardMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler, UseFormReturn, Controller } from 'react-hook-form';
interface ModalFinishProps {
    finishModalIsOpen: boolean,
    closeModal: (type:string) => void;
}

const FinishCardModal = ({ closeModal, finishModalIsOpen }: ModalFinishProps)=> {
  return (
    <div>
        <Modal
                isOpen={finishModalIsOpen}
                onRequestClose={() => closeModal("edit")}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-title'>
                        <p>Editar Card</p>
                    </div>
                </div>
            </Modal>
    </div>
  )
}

export default FinishCardModal