import React from "react";
import moment from "moment";
import Link from "next/link";
import ListTypes from "@/types/ListInterface";
import styles from "@/styles/Home.module.css";

type ListProps = {
  listData: ListTypes;
  key: string;
  onDelete: () => void;
  dataFromStorege: ListTypes[];
};

const List: React.FC<ListProps> = ({ listData, onDelete, dataFromStorege }) => {
  //   const listDate = moment(listData.createdDate).format("MMMM Do YYYY");

  const getTasksNumbers = () => {
    const allTasks = listData.tasks;
    const totalDoneTasks = allTasks.filter((task) => task.checked);
    return {
      doneTask: totalDoneTasks.length,
      undoneTask: allTasks.length - totalDoneTasks.length,
    };
  };

  const { undoneTask, doneTask } = getTasksNumbers();

  return (
    <div className={styles.listWrapper}>
      <Link
        href={{
          pathname: `/list/${listData.id}`,
          query: {
            data: JSON.stringify(dataFromStorege),
          },
        }}
      >
        <div className={styles.listData}>
          {listData.name}
          {/* <div className={styles.listDate}>{listDate}</div> */}

          <div className={styles.listStatusWrapper}>
            {undoneTask ? (
              <div className={styles.listStatus}>
                <div className={styles.listUnDone} />
                {undoneTask}
                {undoneTask === 1 ? " task to do" : " tasks to do"}
              </div>
            ) : null}
            {doneTask ? (
              <div className={styles.listStatus}>
                <div className={styles.listDone} />

                {!undoneTask
                  ? "BRAVO! all tasks is complete"
                  : doneTask === 1
                  ? `${doneTask} task complete`
                  : `${doneTask} tasks complete`}
              </div>
            ) : null}

            {!undoneTask && !doneTask && (
              <div className={styles.listStatus}>
                {` Let's add some tasks :)`}
              </div>
            )}
          </div>
        </div>
      </Link>
      <button className={styles.delete} onClick={onDelete} />
      <div className={styles.reorder} />
    </div>
  );
};

export default List;
