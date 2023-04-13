import React, { useRef, useState } from "react";
import TaskList from "../components/TaskList";
import TaskTypes from "@/types/TaskInterface";
import { v4 as uuid } from "uuid";
import styles from "@/styles/Home.module.css";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const newTaskRef = useRef<HTMLInputElement | null>(null);

  console.log("tasks", tasks);

  const handleAddTask = () => {
    if (newTaskRef.current && newTaskRef.current.value) {
      setTasks([
        ...tasks,
        { id: uuid(), name: newTaskRef.current.value, checked: false },
      ]);
      newTaskRef.current.value = "";
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const checkBoxHandler = (id: string) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      updatedTasks[taskIndex].checked = !updatedTasks[taskIndex].checked;
      setTasks(updatedTasks);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.addTask}>
        <input
          type="text"
          ref={newTaskRef}
          onKeyDown={handleKeyDown}
          placeholder="המשימה הבאה שלי..."
        />
        <button onClick={handleAddTask}>+</button>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        checkBoxHandler={checkBoxHandler}
      />
    </div>
  );
};

export default Home;
