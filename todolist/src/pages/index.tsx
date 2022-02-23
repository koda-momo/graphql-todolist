import type { NextPage } from "next";
import { TodoList } from "../components/TodoList";
import { useQuery } from "@apollo/client";
import { ALL_LIST } from "../queries/query";
import { AddTodo } from "../components/AddTodo";
import { CategoryType } from "../types/type";

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

  return (
    <>
      <div className="flex">
        <div>
          <AddTodo />
        </div>
        <div>
          <TodoList todoList={data.getAllTodo} />
        </div>
        <div className="mt-10 flex">
          <div>カテゴリで搾る:</div>
          <div className="ml-7">
            <button
              type="button"
              className="bg-sky-300 w-36 h-10 text-xl mt-2 flex items-center justify-center rounded-md text-white"
            >
              全て
            </button>
            {data &&
              data.getAllCategory.map((category: CategoryType) => (
                <button
                  type="button"
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
