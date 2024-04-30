import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ModalAddTimeProps} from '@/interfaces/task';
import { FormDataEdit } from '@/interfaces/task';
import Modal from 'react-modal';
import '@/style/dashboard/modal/editCardModal.sass'
import { addTimeWorked} from '@/methods/dashboard/dashboardMethods';

const AddTimeModal = ({ changeModal, modalAddTimeIsOpen, task, reloadTask }: ModalAddTimeProps) => {
    const { register, handleSubmit, formState: { errors } }: UseFormReturn<FormDataEdit> = useForm<FormDataEdit>({
        defaultValues: {
            timeWorked: '00 : 00',
        }
    })
    const onSubmit: SubmitHandler<FormDataEdit> = (data) => {
        addTimeWorked(data.timeWorked, task.task_id)
        changeModal('add')
        setTimeout(() => {
            reloadTask()
        }, 500);
    };

    const handleInputChangeTime = (e: any) => {
        let time = e.target.value.replace(/\D/g, '');
        if (time.length == 4) {
            time = time.replace(/(\d{2})(\d{2})/, '$1 : $2')
        } else if (time.length == 5) {
            time = time.replace(/(\d{3})(\d{2})/, '$1 : $2')
        }
        e.target.value = time
    };

    return (
        <div>
            <Modal
                isOpen={modalAddTimeIsOpen}
                onRequestClose={() => changeModal("add")}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-title'>
                        <p>Lançar Horas Trabalhadas</p>
                    </div>
                    <div className='modal-form'>
                        <form className='modalEditForm' onSubmit={handleSubmit(onSubmit)}>
                            <section className='modal-section'>
                                <div className='modal-fields' >
                                    <div >
                                        <p >Quantidade de horas</p>
                                        <input type="text" placeholder='00 : 00' {...register("timeWorked", { required: true, pattern: /^(\d{2} : [0-5][0-9]|\d{3} : [0-5][0-9]|\d{4}|\d{5})$/, onChange: handleInputChangeTime })} />
                                    </div>
                                    <div className='form-error'>
                                        {errors?.timeWorked?.type == 'required' && <p >Campo obrigatório</p>}
                                        {errors?.timeWorked?.type == 'pattern' && <p >Número inválido</p>}
                                    </div>
                                </div>
                            </section>
                            <div className='dashboard-form__button'>
                                <button type="submit" onClick={() => (onSubmit)}>Lançar horas</button>
                            </div>
                        </form >
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddTimeModal