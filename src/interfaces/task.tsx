
export interface TaskInterface {
  id: string;
  name: string;
  estimatedTime: string;
  criticaly: string;
  deadline: string;
  timeWorked: string
}

export interface FormData {
  activity: string;
  estimatedTime: string;
  criticaly: string;
  column: "1" | "2" | "3";
  deadline: string;
  idUser: string
}

export interface FormAdd {
  addTask: (activity: string, time: string, criticaly: string, option: "1" | "2" | "3", date: string, idUser:string) => void;
}

export interface TaskProps {
  task: {
    id: string;
    name: string;
    estimatedTime: string;
    criticaly: string;
    deadline: string;
    timeWorked: string

  },
  index: number,
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
  deleteCard:(id: string, column: string) => void;
  taskId: string;
  column: string;
}