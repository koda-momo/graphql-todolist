import { FC, memo } from "react";
import { Pencil } from "./Pencil";
import { TodoCategory } from "./TodoCategory";
import { TrashBox } from "./TrashBox";
import { useMutation } from "@apollo/client";
import { TODO_LIST, FINISH_TODO } from "../queries/query";

export type Props = {
  title: string;
  todoId: string;
  categoryName: string;
  finish: boolean;
};

export const TodoCard: FC<Props> = memo((props) => {
  const { title, todoId, categoryName, finish } = props;

  /**
   * finishTodo後データ再読み込み.
   */
  const [finishTodo] = useMutation(FINISH_TODO, {
    refetchQueries: [{ query: TODO_LIST }],
    awaitRefetchQueries: true,
  });

  /**
   * Todo完了.
   * @param data - 入力データ
   */
  const finishTodoData = () => {
    let finishFlug = true;
    if (finish) {
      finishFlug = false;
    }
    finishTodo({
      variables: {
        id: todoId,
        finish: finishFlug,
      },
    });
  };

  return (
    <>
      <div className={`${finish && "opacity-25"} flex items-center`}>
        <div>
          <TodoCategory categoryName={categoryName} />
        </div>
        <div
          className="mx-5 my-3 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl"
          onClick={finishTodoData}
        >
          {title}
        </div>
        <div>
          <Pencil todoId={todoId} />
        </div>
        <div className="ml-3">
          <TrashBox todoId={todoId} />
        </div>
      </div>
    </>
  );
});
