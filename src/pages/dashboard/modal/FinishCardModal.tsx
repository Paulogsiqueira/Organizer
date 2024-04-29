import { ModalFinishProps } from '@/interfaces/task';
import Modal from 'react-modal';
import '@/style/dashboard/modal/finishCardModal.sass'



const FinishCardModal = ({ taskId,deleteCard,closeModal, finishModalIsOpen, deadlineDate, deadlineHours}: ModalFinishProps) => {

    function onSubmit() {
        closeModal("finish")
        deleteCard(parseInt(taskId))
    }

    return (
        <div>
            <Modal
                isOpen={finishModalIsOpen}
                onRequestClose={() => closeModal("finish")}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-finish__title'>
                        <h2>Parabéns</h2>
                    </div>
                    <div className='modal-body'>
                        <p className='modal-body__text'>A tarefa foi finalizada e os dados foram guardados para gerarem estatísticas</p>
                        <p className='modal-body__text'> Você encerrou a tarefa
                            {deadlineDate === "in-time" ? (
                                <span className="in-time"> DENTRO </span>
                            ) : (
                                <span className="out-time"> FORA </span>
                            )}
                            da data limite e
                            {deadlineHours === "in-time" ? (
                                <span className="in-time"> DENTRO </span>
                            ) : (
                                <span className="out-time"> FORA </span>
                            )}
                            das horas estimadas</p>
                        <div className='modal-button'>
                            <button type="submit" onClick={() => (onSubmit())}>Concluir</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FinishCardModal