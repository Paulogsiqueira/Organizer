
export interface TaskInterface {
  task_id: string;
  title: string;
  user_id: string;
  column: string;
  estimated_time: string;
  criticaly: string;
  deadline: string;
  time_worked: string
  completed: boolean;
  delivery_date: string;
  position: string;
  type: string;
}

export interface FormData {
  activity: string;
  estimatedTime: string;
  criticaly: string;
  column: "1" | "2" | "3";
  deadline: string;
  idUser: string;
  type: string

}

export interface position {
  index:number;
  droppableId: string;
}
export interface FormAdd {
  showModalAddTask: () => void;
  userId: string
}

export interface TaskProps {
  task: {
    task_id: string;
    title: string;
    user_id: string;
    column: string;
    estimated_time: string;
    criticaly: string;
    deadline: string;
    time_worked: string
    completed: boolean;
    delivery_date: string;
    position: string;
    type: string

  },
  column: string,
  reloadTask: () => void
}

export interface ModalEditProps {
  modalEditIsOpen: boolean,
  changeModal: (type:string) => void;
  task: TaskInterface,
  column: string,
  reloadTask: () => void,
}

export interface ModalAddTimeProps {
  modalAddTimeIsOpen: boolean,
  changeModal: (type:string) => void;
  task: TaskInterface,
  reloadTask: () => void,
}

export interface FormDataEdit {
  activity: string;
  estimatedTime: string;
  criticaly: string;
  column: "1" | "2" | "3";
  deadline: string;
  timeWorked: string;
  type: string
}

export interface ModalFinishProps {
  finishModalIsOpen: boolean,
  changeModal: (type: string) => void;
  changeCardStatus:(id: number, situation: number) => void;
  taskId: string;
}

export interface completedTasks{
  taskId: number,
  type: number,
  deadline: string,
  deliveryDate: string,
  estimatedTime: string,
  timeWorked: string
  extraTime: string,
  deliveryStatus: string
}

export interface GraphBoardFormProps {
  submitFilter: (firstDate: string, secondDate: string) => Promise<void>;
}
export interface TaskFromOtherUsersProps {
  changeIdUser: (idUser: string) => void;
}