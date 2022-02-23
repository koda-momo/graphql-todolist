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
        <span className="ml-4">カテゴリ</span>
        <span className="ml-36">Todo</span>
        {todoList.map((todo) => (
          <div key={todo.id} className="flex">
            <TodoCard
              title={todo.title}
              todoId={todo.id}
              categoryName={todo.category.name}
              finish={todo.finish}
            />
          </div>
        ))}
      </div>
    </>
  );
});
