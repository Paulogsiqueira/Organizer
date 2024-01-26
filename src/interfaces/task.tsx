
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
}

export interface FormAdd {
  addTask: (activity: string, time: string, criticaly: string, option: "1" | "2" | "3", date: string) => void;
}