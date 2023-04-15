import React, { useEffect, useState } from "react";

import TaskList from "@/components/tasks/TaskList";
import TaskTypes from "@/types/TaskInterface";
import { setTodoListsToLocalStorege } from "../../logic/localStorege";
import CreateNewEntry from "@/components/CreateNewEntry";
import ListTypes from "@/types/ListInterface";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

type TaskWrapperProps = {
  listId: string;
  dataFromStorege: ListTypes[];
};

const TaskWrapper: React.FC<TaskWrapperProps> = ({
  listId,
  dataFromStorege,
}) => {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);

  const [listName, setListName] = useState<string>(
    dataFromStorege.find((list) => listId === list.id)?.name || ""
  );

  useEffect(() => {
    const selectedList = dataFromStorege.find((list) => listId === list.id);
    const tasksFromLocalStorege = selectedList?.tasks || [];
    setTasks(tasksFromLocalStorege);
  }, [listId, dataFromStorege]);

  const updateDataFromStorege = (updatedTasks: TaskTypes[]) => {
    const selectedListIndex = dataFromStorege.findIndex(
      (list) => listId === list.id
    );
    const updateDataFromStorege = [...dataFromStorege];
    updateDataFromStorege[selectedListIndex].tasks = updatedTasks;
    setTodoListsToLocalStorege(updateDataFromStorege);
  };

  const handleAddTask = (taskName: string, taskId: string) => {
    const updatedTasks = [...tasks];
    updatedTasks.unshift({
      id: taskId,
      listId,
      name: taskName,
      checked: false,
    });
    setTasks(updatedTasks);
    updateDataFromStorege(updatedTasks);
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
      setTasks(updatedTasks);
      updateDataFromStorege(updatedTasks);
    }
  };

  const onRenameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setListName(inputValue);
    const updateDataFromStorege = [...dataFromStorege];
    const selectedListIndex = dataFromStorege.findIndex(
      (list) => listId === list.id
    );
    updateDataFromStorege[selectedListIndex].name = inputValue;
    setTodoListsToLocalStorege(updateDataFromStorege);
  };

  return (
    <>
      <Link href="/" className={styles.backButton}>
        {"< Back"}
      </Link>
      <input
        className={styles.taskHead}
        type="text"
        value={listName}
        onChange={onRenameHandler}
      />
      <CreateNewEntry
        onCreateNewEntry={handleAddTask}
        placeholder="My next task..."
      />
      {tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          updateTaskHandler={updateTaskHandler}
          updateDataFromStorege={updateDataFromStorege}
          setTasks={setTasks}
        />
      ) : (
        <div
          className={styles.empty}
        >{`It's time to create your first task.`}</div>
      )}
    </>
  );
};

export default TaskWrapper;
