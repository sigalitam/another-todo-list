import React from "react";
import Task from "./Task";
import TaskTypes from "@/types/TaskInterface";
import styles from "@/styles/Home.module.css";
import { Reorder } from "framer-motion";

type TaskListProps = {
  tasks: TaskTypes[];
  onDelete: (index: number) => void;
  updateTaskHandler: (id: string, type: string, rename?: string) => void;
  setTasks: any;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  updateTaskHandler,
  setTasks,
}) => {
  return (
    <div className={styles.tasksList}>
      <Reorder.Group values={tasks} onReorder={setTasks}>
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
