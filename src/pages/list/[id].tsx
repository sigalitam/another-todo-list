import React from "react";
import { useRouter } from "next/router";
import TaskWrapper from "@/components/tasks/TaskWrapper";
import styles from "@/styles/Home.module.css";

type Props = {};

const ListPage: React.FC<Props> = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div className={styles.mainWrapper}>
      <TaskWrapper listId={id} />
    </div>
  );
};

export default ListPage;
