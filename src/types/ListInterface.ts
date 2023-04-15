import TaskTypes from "@/types/TaskInterface";

export default interface ListTypes {
    id: string;
    name: string;
    createdDate: Date;
    tasks: TaskTypes[];
}