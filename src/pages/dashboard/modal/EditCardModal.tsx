import Modal from 'react-modal';
import '@/style/dashboard/modal/editCardModal.sass'
import { TaskInterface } from '@/interfaces/task';
import { getTask, tasksUserReorder } from '@/methods/dashboard/dashboardMethods';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler, UseFormReturn, Controller } from 'react-hook-form';


interface ModalEditProps {
    modalEditIsOpen: boolean,
    closeModal: (type:string) => void;
    task: TaskInterface,
    column: string,
    reloadTask: () => void
}
interface FormData {
    activity: string;
    estimatedTime: string;
    criticaly: string;
    column: "1" | "2" | "3";
    deadline: string;
    timeWorked: string;
}



const EditCardModal = ({ closeModal, modalEditIsOpen, task, column, reloadTask }: ModalEditProps) => {
    const { register, handleSubmit, formState: { errors }, control }: UseFormReturn<FormData> = useForm<FormData>({
        defaultValues: {
            activity: task.name,
            deadline: task.deadline,
            estimatedTime: task.estimatedTime,
            criticaly: task.criticaly
        }
    })
    const user = useSelector(selectUser)
    const onSubmit: SubmitHandler<FormData> = (data) => {
        changeTask(data)
    };

    async function changeTask(data: FormData) {
        const list = await getTask(user.idUser, column)
        const arrayList = JSON.parse(list)
        console.log(arrayList)
        const newList = arrayList.map((item: TaskInterface) =>
            item.id === task.id ? { ...item, name: data.activity, estimatedTime: data.estimatedTime,criticaly: data.criticaly, deadline: data.deadline, timeWorked: data.timeWorked } : item
        );
        let option: "1" | "2" | "3";
        if (column === 'done') {
            option = '3';
        } else if (column === 'doing') {
            option = '2';
        } else {
            option = '1';
        }
        const listToString = JSON.stringify(newList)
        tasksUserReorder(user.idUser, listToString, option)
        closeModal('edit')
        reloadTask()
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