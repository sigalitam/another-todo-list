import React from "react";
import Task from "./Task";
import TaskTypes from "@/types/TaskInterface";
import styles from "@/styles/Home.module.css";

type TaskListProps = {
  tasks: TaskTypes[];
  onDelete: (index: number) => void;
  checkBoxHandler: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  checkBoxHandler,
}) => {
  return (
    <div className={styles.tasksList}>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          checkBoxHandler={checkBoxHandler}
        />
      ))}
    </div>
  );
};

export default TaskList;
