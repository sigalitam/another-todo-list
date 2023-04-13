import React from "react";
import styles from "@/styles/Home.module.css";
import TaskTypes from "@/types/TaskInterface";

type TaskProps = {
  task: TaskTypes;
  onDelete: () => void;
  checkBoxHandler: (id: string) => void;
};

const Task: React.FC<TaskProps> = ({ task, onDelete, checkBoxHandler }) => {
  return (
    <div className={styles.taskWrapper}>
      <div
        className={`${styles.checkBox} ${task.checked ? styles.checked : null}`}
        onClick={() => checkBoxHandler(task.id)}
      />
      <span>{task.name}</span>
      <button className={styles.delete} onClick={onDelete} />
    </div>
  );
};

export default Task;
