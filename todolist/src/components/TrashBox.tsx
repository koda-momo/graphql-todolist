import { FC, memo } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO, TODO_LIST } from "../queries/query";

export type Props = {
  todoId: string;
};

export const TrashBox: FC<Props> = memo((props) => {
  const { todoId } = props;

  /**
   * deleteTodo後データ再読み込み.
   */
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: TODO_LIST }],
    awaitRefetchQueries: true,
  });

  /**
   * Todo削除.
   * @param data - 入力データ
   */
  const deleteTodoData = () => {
    deleteTodo({
      variables: {
        id: todoId,
      },
    });
  };

  return (
    <>
      <button
        type="button"
        className="bg-sky-300 w-10 h-10 flex items-center justify-center rounded-md text-white"
        onClick={deleteTodoData}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </>
  );
});
