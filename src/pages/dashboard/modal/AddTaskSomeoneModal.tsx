import '@/style/dashboard/modal/AddTaskSomeoneModal.sass'
import Modal from 'react-modal';

const AddTaskSomeoneModal: React.FC<{ modalAddTaskSomeoneIsOpen: boolean, closeModal:(type:string) => void }> = ({ modalAddTaskSomeoneIsOpen,closeModal }) => {
    return (
        <div>
            <Modal
                isOpen={modalAddTaskSomeoneIsOpen}
                onRequestClose={() => closeModal("addTask")}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-finish__title'>
                        <h2>Tarefa Adicionada</h2>
                    </div>
                    <div className='modal-change-body'>
                        <p>A tarefa foi adicionada ao usuário selecionado!</p>
                        <button type="submit" onClick={() => closeModal('addTask')}>Finalizar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddTaskSomeoneModal;
