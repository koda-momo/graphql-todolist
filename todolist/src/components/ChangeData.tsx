import { FC, memo, useState } from "react";
import { CategoryType } from "../types/type";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TODO, TODO_LIST, CATEGORY_LIST } from "../queries/query";

export const ChangeData: FC = memo(() => {
  //categoryリスト選択肢用
  const { data } = useQuery(CATEGORY_LIST);

  //react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * changeTodo後データ再読み込み.
   */
  const [changeTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: TODO_LIST }],
    awaitRefetchQueries: true,
  });

  /**
   * Todo変更.
   * @param data - 入力データ
   */
  const changeTodoData = (data: any) => {
    changeTodo({
      variables: {
        title: data.todoTitle,
        categoryId: data.categoryId,
      },
    });
    //入力完了→値のリセット
    reset({ todoTitle: "", categoryId: "" });
  };

  return (
    <>
      <div className="w-96 border-solid border-2 border-gray-500 bg-stone-200 m-10 p-3 rounded-md">
        <div className="text-xl text-center">データの追加</div>
        <div className="my-5 leading-10">
          <input
            size={40}
            className="border-solid border-1 border-gray-200"
            type="text"
            placeholder="Todo"
            {...register("todoTitle")}
          />
        </div>
        <div>
          <select className="form-control" {...register("categoryId")}>
            <option hidden>カテゴリの種類を選択</option>
            {data &&
              data.getAllCategory.map((category: CategoryType) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex justify-center my-5">
          <button
            type="button"
            onClick={handleSubmit(changeTodo)}
            className="bg-yellow-500 px-5 py-2 rounded-md"
          >
            追加
          </button>
        </div>
      </div>
    </>
  );
});
