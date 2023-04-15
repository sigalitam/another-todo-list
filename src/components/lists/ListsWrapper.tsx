import React, { useEffect, useState } from "react";
import CreateNewEntry from "@/components/CreateNewEntry";
import ListTypes from "@/types/ListInterface";
import List from "./List";
import {
  setTodoListsToLocalStorege,
  getTodoListsFromLocalStorege,
} from "@/logic/localStorege";
import { Reorder } from "framer-motion";
import styles from "@/styles/Home.module.css";

const ListsWrapper: React.FC = () => {
  const [lists, setLists] = useState<ListTypes[]>([]);
  useEffect(() => {
    const parseLists = getTodoListsFromLocalStorege();
    setLists(parseLists);
  }, []);

  const handleAddList = (listName: string, listId: string) => {
    const updatedList = [...lists];
    updatedList.unshift({
      id: listId,
      name: listName,
      createdDate: new Date(),
      tasks: [],
    });
    setLists(updatedList);
    setTodoListsToLocalStorege(updatedList);
  };

  const deleteListHandler = (listId: string) => {
    let updatedLists = [...lists];
    updatedLists = updatedLists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setTodoListsToLocalStorege(updatedLists);
  };

  const onReorderHandler = (updatedLists: ListTypes[]) => {
    setLists(updatedLists);
    setTodoListsToLocalStorege(updatedLists);
  };

  return (
    <div className={styles.listsWrapper}>
      <h1 className={styles.taskHead}>{`Another Todo list`}</h1>
      <CreateNewEntry
        onCreateNewEntry={handleAddList}
        placeholder="My new List..."
      />
      {lists.length ? (
        <Reorder.Group values={lists} onReorder={onReorderHandler}>
          {lists.map((list) => (
            <Reorder.Item key={list.id} value={list}>
              <List
                dataFromStorege={lists}
                listData={list}
                key={list.id}
                onDelete={() => deleteListHandler(list.id)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div
          className={styles.empty}
        >{`It's time to create your first list.`}</div>
      )}
    </div>
  );
};

export default ListsWrapper;
