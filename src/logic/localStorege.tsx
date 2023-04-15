import ListTypes from "@/types/ListInterface";

export const setTodoListsToLocalStorege = (updatedLists: ListTypes[]) => {
  return localStorage.setItem("todoLists", JSON.stringify(updatedLists));
};

export const getTodoListsFromLocalStorege = (): ListTypes[] => {
  const localStorageLists = localStorage.getItem("todoLists");
  if (localStorageLists) {
    return JSON.parse(localStorageLists);
  }
  return [];
};
