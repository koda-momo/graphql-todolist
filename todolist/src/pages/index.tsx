import type { NextPage } from "next";
import { TodoList } from "../components/TodoList";
import { useQuery } from "@apollo/client";
import { TODO_LIST } from "../queries/query";
import { AddTodo } from "../components/AddTodo";

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(TODO_LIST);

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
      </div>
    </>
  );
};

export default Home;
