import { FC, memo } from "react";
import { TodoType } from "../types/type";
import { TodoCard } from "./TodoCard";

export type Props = {
  todoList: Array<TodoType>;
};

export const TodoList: FC<Props> = memo((props) => {
  const { todoList } = props;

  return (
    <>
      <div className="border-solid border-2 border-gray-500 m-10 p-3 rounded-md">
        {todoList.map((todo) => (
          <div key={todo.id}>
            <TodoCard title={todo.title} todoId={todo.id} />
          </div>
        ))}
      </div>
    </>
  );
});
