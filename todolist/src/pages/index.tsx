import type { NextPage } from "next";
import { TodoList } from "../components/TodoList";
import { useQuery } from "@apollo/client";
import { ALL_LIST } from "../queries/query";
import { AddTodo } from "../components/AddTodo";
import { CategoryType, TodoType } from "../types/type";
import { useState } from "react";

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(ALL_LIST);

  //読み込み中時の表示
  if (loading) {
    return <p>loding…</p>;
  }
  //エラー時の表示
  if (error) {
    return <p>Error</p>;
  }

  const todoData = data?.getAllTodo;
  const [dataArray, setDataArray] = useState<Array<TodoType>>([]);
  const [categoryFlug, setCategoryFlug] = useState(false);
  /**
   * 表示するTodoのカテゴリを搾る.
   * @param categoryName 選択したカテゴリの名前
   */
  const changeCategory = (categoryName: string) => {
    const array = todoData.filter(
      (todo: TodoType) => todo.category.name === categoryName
    );
    if (array.length != 0) {
      setDataArray([...array]);
      setCategoryFlug(true);
    } else {
      alert("該当カテゴリの登録がないため、全件表示します");
      setCategoryFlug(false);
    }
  };

  /**
   * 全データ表示.
   */
  const showAllData = () => {
    setCategoryFlug(false);
  };

  return (
    <>
      <div className="flex">
        <div>
          <AddTodo />
        </div>
        {categoryFlug ? (
          <div>
            <TodoList todoList={dataArray} />
          </div>
        ) : (
          <div>
            <TodoList todoList={todoData} />
          </div>
        )}

        <div className="mt-10">
          <div>カテゴリで搾る:</div>
          <div className="ml-7">
            <button
              type="button"
              onClick={showAllData}
              className="bg-sky-300 w-36 h-10 text-xl mt-2 flex items-center justify-center rounded-md text-white"
            >
              全て
            </button>
            {data &&
              data.getAllCategory.map((category: CategoryType) => (
                <button
                  type="button"
                  onClick={() => {
                    changeCategory(category.name);
                  }}
                  className="bg-sky-300 w-36 h-10 text-xl mt-2 flex items-center justify-center rounded-md text-white"
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
