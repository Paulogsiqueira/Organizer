import { useForm, SubmitHandler, UseFormReturn, Controller } from 'react-hook-form';
import { ModalEditProps, TaskInterface } from '@/interfaces/task';
import { FormDataEdit } from '@/interfaces/task';
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import Modal from 'react-modal';
import '@/style/dashboard/modal/editCardModal.sass'

const EditCardModal = ({ closeModal, modalEditIsOpen, task, reloadTask }: ModalEditProps) => {
    const user = useSelector(selectUser)
    const { register, handleSubmit, formState: { errors }, control }: UseFormReturn<FormDataEdit> = useForm<FormDataEdit>({
        defaultValues: {
            activity: task.title,
            deadline: task.deadline,
            estimatedTime: task.estimated_time,
            criticaly: task.criticaly,
            timeWorked:task.time_worked
        }
    })
    const onSubmit: SubmitHandler<FormDataEdit> = (data) => {
        changeTask(data)
        setTimeout(() => {
            reloadTask()
        }, 1000);
        console.log("OK")
    };

    async function changeTask(data: FormDataEdit) {
        
        closeModal('edit')
    }

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
                isOpen={modalEditIsOpen}
                onRequestClose={() => closeModal("edit")}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-title'>
                        <p>Editar Card</p>
                    </div>
                    <div className='modal-form'>
                        <form className='modalEditForm' onSubmit={handleSubmit(onSubmit)}>
                            <section>
                                <div className='modal-field'>
                                    <div >
                                        <p>Atividade</p>
                                        <input type="text" placeholder='Digite o nome da atividade' {...register("activity", { required: true, maxLength: 43 })} />
                                    </div>
                                    <div className='form-error'>
                                        {errors?.activity?.type == 'required' && <p >Campo obrigatório</p>}
                                        {errors?.activity?.type == 'maxLength' && <p >Tamanho máximo excedido</p>}
                                    </div>
                                </div>
                            </section>
                            <section className='modal-section'>
                                <div className='modal-fields' >
                                    <div >
                                        <p >Tempo estimado</p>
                                        <input type="text" placeholder='00:00' {...register("estimatedTime", { required: true, pattern: /^(\d{2} : \d{2}|\d{3} : \d{2}|\d{4}|\d{5})$/, onChange: handleInputChangeTime })} />
                                    </div>
                                    <div className='form-error'>
                                        {errors?.estimatedTime?.type == 'required' && <p >Campo obrigatório</p>}
                                        {errors?.estimatedTime?.type == 'pattern' && <p >Número inválido</p>}
                                    </div>
                                </div>
                                <div className='modal-fields'>
                                    <div >
                                        <p >Tempo trabalhado</p>
                                        <input type="text" placeholder='00:00' {...register("timeWorked", { required: false, pattern: /^(\d{2} : \d{2}|\d{3} : \d{2}|\d{4}|\d{5})$/, onChange: handleInputChangeTime })} />
                                    </div>
                                    <div className='form-error'>
                                        {errors?.estimatedTime?.type == 'required' && <p >Campo obrigatório</p>}
                                        {errors?.estimatedTime?.type == 'pattern' && <p >Número inválido</p>}
                                    </div>
                                </div>

                            </section>
                            <section className='modal-section'>
                                <div className='modal-fields' >
                                    <div >
                                        <p>Criticidade</p>
                                        <Controller
                                            name="criticaly"
                                            control={control}
                                            render={({ field }) => (
                                                <select {...field}>
                                                    <option value='1'>Baixa</option>
                                                    <option value='2'>Média</option>
                                                    <option value='3'>Alta</option>
                                                </select>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='modal-fields'>
                                    <div >
                                        <p >Data Limite</p>
                                        <input type="date" className='deadline-input'{...register("deadline", { required: true })} />
                                    </div>
                                    <div className='form-error'>
                                        {errors?.deadline?.type == 'required' && <p >Campo obrigatório</p>}
                                    </div>
                                </div>
                            </section>

                            <div className='dashboard-form__button'>
                                <button type="submit" onClick={() => (onSubmit)}>Salvar Alterações</button>
                            </div>
                        </form >
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditCardModal