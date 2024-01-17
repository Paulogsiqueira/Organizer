import Modal from 'react-modal';
import '@/style/dashboard/modal/editCardModal.sass'


interface ModalErrorProps {
    modalErrorIsOpen: boolean,
    closeModal: () => void;
}

const EditCardModal = ({ closeModal, modalErrorIsOpen }: ModalErrorProps) => {
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
                        <label>Atividade
                            <input type='text'/>
                        </label>

                    </div>

                    <button onClick={() => closeModal()} className='modal-btn'>Salvar Alterações</button>
                </div>
            </Modal>
        </div>
    )
}

export default EditCardModal