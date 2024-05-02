import { ModalFinishProps } from '@/interfaces/task';
import Modal from 'react-modal';
import '@/style/dashboard/modal/finishCardModal.sass'



const FinishCardModal = ({ taskId,changeCardStatus,changeModal, finishModalIsOpen}: ModalFinishProps) => {

    function onSubmit() {
        changeModal("finish")
        changeCardStatus(parseInt(taskId), 1)
    }

    return (
        <div>
            <Modal
                isOpen={finishModalIsOpen}
                onRequestClose={() => changeModal("finish")}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-finish__title'>
                        <h2>Parabéns</h2>
                    </div>
                    <div className='modal-body'>
                        <p className='modal-body__text'>A tarefa foi finalizada e os dados foram guardados para gerarem estatísticas</p>
                        <div className='modal-button'>
                            <button type="submit" onClick={() => (onSubmit())}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FinishCardModal