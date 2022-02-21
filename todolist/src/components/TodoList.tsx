import { FC, memo } from "react";
import { TodoCard } from "./TodoCard";

export const TodoList: FC = memo(() => {
  return (
    <>
      <div className="border-solid border-2 border-gray-500 m-10 p-3 rounded-md">
        <TodoCard title="掃除" />
        <TodoCard title="洗濯" />
        <TodoCard title="引っ越し" />
      </div>
    </>
  );
});
