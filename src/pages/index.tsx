import React from "react";
import TaskWrapper from "@/components/tasks/TaskWrapper";
import styles from "@/styles/Home.module.css";
import ListsWrapper from "@/components/lists/ListsWrapper";

const Home: React.FC = () => {
  return (
    <div className={styles.mainWrapper}>
      {/* <TaskWrapper /> */}
      <ListsWrapper />
    </div>
  );
};

export default Home;
