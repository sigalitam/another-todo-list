import React, { useRef } from "react";
import styles from "@/styles/Home.module.css";
import { v4 as uuid } from "uuid";

type EntryPorps = {
  onCreateNewEntry: (entry: string, id: string) => void;
  placeholder: string;
};

const CreateNewEntry: React.FC<EntryPorps> = ({
  onCreateNewEntry,
  placeholder,
}) => {
  const newTaskRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      createNewEntryHandler();
    }
  };

  const createNewEntryHandler = () => {
    if (newTaskRef.current && newTaskRef.current.value) {
      onCreateNewEntry(newTaskRef.current.value, uuid());
      newTaskRef.current.value = "";
    }
  };
  return (
    <div className={styles.addTask}>
      <input
        type="text"
        ref={newTaskRef}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button onClick={createNewEntryHandler}>+</button>
    </div>
  );
};

export default CreateNewEntry;
