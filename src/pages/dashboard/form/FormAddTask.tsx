import { useForm, SubmitHandler, UseFormReturn, Controller } from 'react-hook-form';
import { FormData, FormAdd } from '@/interfaces/task';
import { FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import '@/style/dashboard/form/formAddTask.sass'
import { getUsers } from '@/methods/others/othersMethods';

const FormAddTask = ({ addTask }: FormAdd) => {
    const { register, handleSubmit, formState: { errors }, control }: UseFormReturn<FormData> = useForm<FormData>()
    const [taskForSomenone, setTaskForSomenone] = useState(false)
    const [allUsers, setAllUsers] = useState([{idName:"teste"}])
    const user = useSelector(selectUser)

    useEffect(() => {
        if (taskForSomenone) {
            const getAllUsers = async () => {
                const users = await getUsers();
                setAllUsers(users)
            };
            getAllUsers();
        }
    }, [(taskForSomenone)]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        addTask(data.activity, data.estimatedTime, data.criticaly, data.column, data.deadline,data.idUser)
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
        <div className='dashboard-form'>
            <h3>Nova Tarefa</h3>
            <form className='dashboard-form__body' onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <div className='form-input__long'>
                        <div className='input-button'>
                            <p>Atividade:</p>
                            <input type="text" placeholder='Digite o nome da atividade' {...register("activity", { required: true, maxLength: 43 })} />
                        </div>
                        <div className='form-error'>
                            {errors?.activity?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.activity?.type == 'maxLength' && <p >Tamanho máximo excedido</p>}
                        </div>
                    </div>
                    <div className='form-input__short'>
                        <div className='input-button'>
                            <p className='input-title__time'>Tempo estimado:</p>
                            <input className="input-short__time" type="text" placeholder='00:00' {...register("estimatedTime", { required: true, pattern: /^(\d{2} : \d{2}|\d{3} : \d{2}|\d{4}|\d{5})$/, onChange: handleInputChangeTime })} />
                        </div>
                        <div className='form-error'>
                            {errors?.estimatedTime?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.estimatedTime?.type == 'pattern' && <p >Número inválido</p>}
                        </div>
                    </div>
                </section>
                <section className='form-section__2'>
                    <div className='form-input__veryshort'>
                        <div className='input-button input-list'>
                            <p>Criticidade:</p>
                            <Controller
                                name="criticaly"
                                control={control}
                                defaultValue="1"
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
                    <div className='form-input__veryshort'>
                        <div className='input-button input-list'>
                            <p>Coluna:</p>
                            <Controller
                                name="column"
                                control={control}
                                defaultValue="1"
                                render={({ field }) => (
                                    <select {...field}>
                                        <option value='1'>To Do</option>
                                        <option value='2'>Doing</option>
                                        <option value='3'>Done</option>
                                    </select>
                                )}
                            />
                        </div>
                    </div>
                    <div className='form-input__short'>
                        <div className='input-button'>
                            <p className='input-title__date'>Data Limite:</p>
                            <input type="date" className="input-short__date" {...register("deadline", { required: true })} />
                        </div>
                        <div className='form-error'>
                            {errors?.deadline?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                </section>
                <section style={{ display: user.accessLevel == "2" ? 'flex' : 'none' }}>
                    <div className='taskForSomenone-checkbox'>
                        <FormControlLabel control={<Checkbox sx={{ color: '#5ABFA6', '&.Mui-checked': { color: '#5ABFA6' } }} onChange={() => { setTaskForSomenone(!taskForSomenone) }} />} label="Adicionar tarefa para outra pessoa" />
                    </div>
                    <div className='taskForSomenone-list'>
                        <div className='select-button input-list' style={{ display: taskForSomenone == true ? 'flex' : 'none' }}>
                            <p>Nome:</p>
                            <Controller
                                name="idUser"
                                control={control}
                                defaultValue="0"
                                rules={{
                                    validate: value => (value !== "0" || taskForSomenone == false)
                                }}
                                render={({ field }) => (
                                    <select {...field}>
                                        <option value="0">Selecione...</option>
                                        {allUsers.map((user, index) => {
                                            const match = user.idName.match(/^\s*(\d+)\s*-/);
                                            const value = match ? match[1] : '21'
                                            return <option key={index} value={value}>{user.idName}</option>})
                                        }
                                            
                                    </select>
                                )}
                            />
                        </div>
                    </div>
                </section>

                <div className='dashboard-form__button'>
                    <button type="submit" onClick={() => (onSubmit)}>Adicionar Tarefa</button>
                </div>
            </form >
        </div>
    )
}

export default FormAddTask