import React from "react";
import styles from "@/styles/Home.module.css";
import TaskTypes from "@/types/TaskInterface";

type TaskProps = {
  task: TaskTypes;
  onDelete: () => void;
  updateTaskHandler: (id: string, type: string, rename?: string) => void;
};

const Task: React.FC<TaskProps> = ({ task, onDelete, updateTaskHandler }) => {
  const onRenameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    updateTaskHandler(task.id, "rename", inputValue);
  };

  return (
    <div
      className={`${styles.taskWrapper} ${
        task.checked ? styles.taskWrapperChecked : null
      }`}
    >
      <div
        className={`${styles.checkBox} ${task.checked ? styles.checked : null}`}
        onClick={() => updateTaskHandler(task.id, "checked")}
      />
      <input
        className={`${styles.taskRenameInput} ${
          task.checked ? styles.checkedInput : null
        }`}
        type="text"
        value={task.name}
        onChange={onRenameHandler}
        disabled={task.checked}
      />
      <button className={styles.delete} onClick={onDelete} />
      <div className={styles.reorder} />
    </div>
  );
};

export default Task;
