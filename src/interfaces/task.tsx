
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
}

export interface FormData {
  activity: string;
  estimatedTime: string;
  criticaly: string;
  column: "1" | "2" | "3";
  deadline: string;
  idUser: string
}

export interface position {
  index:number;
  droppableId: string;
}
export interface FormAdd {
  addTaskConcluded: () => void;
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

  },
  column: string,
  reloadTask: () => void
}

export interface ModalEditProps {
  modalEditIsOpen: boolean,
  closeModal: (type:string) => void;
  task: TaskInterface,
  column: string,
  reloadTask: () => void
}

export interface FormDataEdit {
  activity: string;
  estimatedTime: string;
  criticaly: string;
  column: "1" | "2" | "3";
  deadline: string;
  timeWorked: string;
}

export interface ModalFinishProps {
  finishModalIsOpen: boolean,
  closeModal: (type: string) => void;
  deadlineDate: string;
  deadlineHours: string
  deleteCard:(id: number) => void;
  taskId: string;
}