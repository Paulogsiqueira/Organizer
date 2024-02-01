import '@/style/dashboard/modal/changeColumnModal.sass'
import loading from '/dashboard/loading.gif';
import Modal from 'react-modal';

const ChangeColumnModal: React.FC<{ modalChangeColumnIsOpen: boolean }> = ({ modalChangeColumnIsOpen }) => {
    return (
        <div>
            <Modal
                isOpen={modalChangeColumnIsOpen}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-finish__title'>
                        <h2>Carregando...</h2>
                    </div>
                    <div className='modal-change-body'>
                        <img src={loading} alt="Loading page"/>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ChangeColumnModal;
