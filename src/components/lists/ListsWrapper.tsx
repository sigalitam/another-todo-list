import React, { useEffect, useState } from "react";
import CreateNewEntry from "@/components/CreateNewEntry";
import ListTypes from "@/types/ListInterface";
import TaskTypes from "@/types/TaskInterface";
import List from "./List";

export default function ListsWrapper() {
  const [lists, setLists] = useState<ListTypes[]>([]);
  useEffect(() => {
    const localStorageLists = localStorage.getItem("lists");
    if (localStorageLists) {
      const parseLists = JSON.parse(localStorageLists);
      setLists(parseLists);
    }
  }, []);

  const setListsToLocalStorege = (updatedLists: ListTypes[]) => {
    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const handleAddList = (listName: string, listId: string) => {
    const updatedList = [...lists];
    updatedList.push({
      id: listId,
      name: listName,
      createdDate: new Date(),
      tasks: [],
    });
    setLists(updatedList);
    setListsToLocalStorege(updatedList);
  };

  const deleteListHandler = (listId: string) => {
    let updatedLists = [...lists];
    updatedLists = updatedLists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setListsToLocalStorege(updatedLists);

    // const localStorageTasks = localStorage.getItem("tasks");
    // if (localStorageTasks) {
    //   const parseTasks = JSON.parse(localStorageTasks);
    //   const updatedTasks = parseTasks.filter(
    //     (task: TaskTypes) => task.listId !== listId
    //   );
    //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // }
  };

  return (
    <div>
      <CreateNewEntry
        onCreateNewEntry={handleAddList}
        placeholder="New List..."
      />
      {lists.map((list) => (
        <List
          listData={list}
          key={list.id}
          onDelete={() => deleteListHandler(list.id)}
        />
      ))}
    </div>
  );
}
