import { FC, memo, useState } from "react";
import { CategoryType } from "../types/type";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TODO, TODO_LIST, CATEGORY_LIST } from "../queries/query";

export const AddTodo: FC = memo(() => {
  const { data } = useQuery(CATEGORY_LIST);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * クリアボタン
   */
  const clear = () => {
    reset({
      accountName: "",
      hireDate: "",
      birthDay: "",
      password: "",
      passwordConf: "",
    });
  };

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: TODO_LIST }],
    awaitRefetchQueries: true,
  });

  const addTodoData = (data: any, e: any) => {
    console.log("入力データ:" + JSON.stringify(data));
    addTodo({
      variables: {
        title: data.todoTitle,
        categoryId: data.categoryId,
      },
    });
    clear();
  };

  return (
    <>
      <div className="w-96 border-solid border-2 border-gray-500 m-10 p-3 rounded-md">
        <div className="text-xl text-center">データの追加</div>
        <div>
          <input
            width={200}
            height={10}
            className="border-solid border-1 border-gray-200"
            type="text"
            placeholder="Todo"
            {...register("todoTitle")}
          />
        </div>
        <div>
          <select className="form-control" {...register("categoryId")}>
            <option hidden>カテゴリ</option>
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
            onClick={handleSubmit(addTodoData)}
            className="bg-yellow-500 px-5 py-2 rounded-md"
          >
            追加
          </button>
        </div>
      </div>
    </>
  );
});
