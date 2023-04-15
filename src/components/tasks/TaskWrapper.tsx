import React, { useEffect, useState } from "react";

import TaskList from "@/components/tasks/TaskList";
import TaskTypes from "@/types/TaskInterface";

import CreateNewEntry from "@/components/CreateNewEntry";

const TaskWrapper: React.FC<{ listId: string }> = ({ listId }) => {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<TaskTypes[]>([]);

  const updateTasksState = (newTasks: TaskTypes[], currentListId: string) => {
    const filteredTasks = newTasks.filter(
      (task: TaskTypes) => task.listId === currentListId
    );
    setTasks(newTasks);
    setSelectedTasks(filteredTasks);
  };

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      const parseTasks = JSON.parse(localStorageTasks);
      updateTasksState(parseTasks, listId);
    }
  }, [listId]);

  const setTasksToLocalStorege = (updatedTasks: TaskTypes[]) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = (taskName: string, taskId: string) => {
    const updatedTasks = [...tasks];
    updatedTasks.unshift({
      id: taskId,
      listId,
      name: taskName,
      checked: false,
    });
    updateTasksState(updatedTasks, listId);
    setTasksToLocalStorege(updatedTasks);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const reorderTasks = (updatedTasks: TaskTypes[]) => {
    const reorderTasks = [...updatedTasks];
    reorderTasks.sort((a, b) => Number(a.checked) - Number(b.checked));
    return reorderTasks;
  };

  const updateTaskHandler = (id: string, type: string, rename?: string) => {
    let updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      if (type === "checked") {
        updatedTasks[taskIndex].checked = !updatedTasks[taskIndex].checked;
        updatedTasks = reorderTasks(updatedTasks);
      }
      if (type === "rename") {
        updatedTasks[taskIndex].name = rename || "";
      }
      updateTasksState(updatedTasks, listId);
      setTasksToLocalStorege(updatedTasks);
    }
  };

  return (
    <>
      <CreateNewEntry
        onCreateNewEntry={handleAddTask}
        placeholder="My next task..."
      />
      <TaskList
        tasks={selectedTasks}
        onDelete={handleDeleteTask}
        updateTaskHandler={updateTaskHandler}
        setTasks={setTasks}
      />
    </>
  );
};

export default TaskWrapper;
