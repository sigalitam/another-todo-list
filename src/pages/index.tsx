import React, { useEffect, useRef, useState } from "react";
import TaskList from "../components/TaskList";
import TaskTypes from "@/types/TaskInterface";
import { v4 as uuid } from "uuid";
import styles from "@/styles/Home.module.css";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const newTaskRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      const parseTasks = JSON.parse(localStorageTasks);
      setTasks(parseTasks);
    }
  }, []);

  const setTasksToLocalStorege = (updatedTasks: TaskTypes[]) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (newTaskRef.current && newTaskRef.current.value) {
      const updatedTasks = [...tasks];
      updatedTasks.push({
        id: uuid(),
        name: newTaskRef.current.value,
        checked: false,
      });
      setTasks(updatedTasks);
      newTaskRef.current.value = "";
      setTasksToLocalStorege(updatedTasks);
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTaskHandler = (id: string, type: string, rename?: string) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      if (type === "checked") {
        updatedTasks[taskIndex].checked = !updatedTasks[taskIndex].checked;
      }
      if (type === "rename") {
        updatedTasks[taskIndex].name = rename || "";
      }
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
          placeholder="My next task..."
        />
        <button onClick={handleAddTask}>+</button>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        updateTaskHandler={updateTaskHandler}
      />
    </div>
  );
};

export default Home;
