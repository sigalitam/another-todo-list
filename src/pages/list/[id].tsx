import React from "react";
import { useRouter } from "next/router";
import TaskWrapper from "@/components/tasks/TaskWrapper";
import styles from "@/styles/Home.module.css";

type Props = {};

const ListPage: React.FC<Props> = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const getDataFromStorege = () => {
    if (router.query.data) {
      return JSON.parse(router.query.data as string);
    }
    return [];
  };

  const dataFromStorege = getDataFromStorege();

  return (
    <div className={styles.mainWrapper}>
      <TaskWrapper listId={id} dataFromStorege={dataFromStorege} />
    </div>
  );
};

export default ListPage;
