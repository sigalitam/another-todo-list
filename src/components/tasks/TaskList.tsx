import React from "react";
import { Reorder } from "framer-motion";
import Task from "@/components/tasks/Task";
import TaskTypes from "@/types/TaskInterface";
import styles from "@/styles/Home.module.css";

type TaskListProps = {
  tasks: TaskTypes[];
  onDelete: (index: number) => void;
  updateTaskHandler: (id: string, type: string, rename?: string) => void;
  updateDataFromStorege: (tasks: TaskTypes[]) => void;
  setTasks: (tasks: TaskTypes[]) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  updateTaskHandler,
  updateDataFromStorege,
  setTasks,
}) => {
  const onReorderHandler = (updatedTasks: TaskTypes[]) => {
    setTasks(updatedTasks);
    updateDataFromStorege(updatedTasks);
  };

  return (
    <div className={styles.tasksList}>
      <Reorder.Group values={tasks} onReorder={onReorderHandler}>
        {tasks.map((task, index) => (
          <Reorder.Item key={task.id} value={task}>
            <Task
              key={index}
              task={task}
              onDelete={() => onDelete(index)}
              updateTaskHandler={updateTaskHandler}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default TaskList;
