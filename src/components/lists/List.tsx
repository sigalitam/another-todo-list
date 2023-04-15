import React from "react";
import moment from "moment";

import Link from "next/link";
import ListTypes from "@/types/ListInterface";

import styles from "@/styles/Home.module.css";

type ListProps = {
  listData: ListTypes;
  key: string;
  onDelete: () => void;
};

const List: React.FC<ListProps> = ({ listData, onDelete }) => {
  const listDate = moment(listData.createdDate).format("MMMM Do YYYY");

  const getTasksNumbersFromListId = () => {};

  return (
    <div className={styles.listWrapper}>
      <Link href={`/list/${listData.id}`}>
        <div className={styles.listData}>
          {listData.name}
          {/* <input
            className={styles.taskRenameInput}
            type="text"
            value={listData.name}
            // onChange={onRenameHandler}
          /> */}
          {/* <div className={styles.listDate}>{listDate}</div> */}
          <div className={styles.listStatusWrapper}>
            <div className={styles.listStatus}>
              <div className={styles.listUnDone} />
              {`6 Tasks`}
            </div>
            <div className={styles.listStatus}>
              <div className={styles.listDone} />
              {`8 Tasks`}
            </div>
          </div>
        </div>

        {/* <button className={styles.delete} onClick={onDelete} /> */}
        {/* <div className={styles.reorder} /> */}
      </Link>
    </div>
  );
};

export default List;
