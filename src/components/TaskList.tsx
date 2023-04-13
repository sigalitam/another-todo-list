import React from "react";
import Task from "./Task";
import TaskTypes from "@/types/TaskInterface";
import styles from "@/styles/Home.module.css";

type TaskListProps = {
  tasks: TaskTypes[];
  onDelete: (index: number) => void;
  updateTaskHandler: (id: string, type: string, rename?: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  updateTaskHandler,
}) => {
  return (
    <div className={styles.tasksList}>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          updateTaskHandler={updateTaskHandler}
        />
      ))}
    </div>
  );
};

export default TaskList;
