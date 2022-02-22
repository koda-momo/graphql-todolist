import type { NextPage } from "next";
import { TodoList } from "../components/TodoList";
import { useQuery } from "@apollo/client";
import {} from "../components/AddTodo";
import { useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { TODO_AND_Category } from "../queries/query";
import { CategoryType } from "../types/type";
import { useForm } from "react-hook-form";
import { ADD_TODO, TODO_LIST, CATEGORY_LIST } from "../queries/query";

const TodoFix: NextPage = () => {
  //ルーターリンク
  const router = useRouter();
  //URLの後ろからid取得
  const todoId = router.query.id;

  const { loading, error, data } = useQuery(TODO_AND_Category, {
    variables: { id: todoId },
  });

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
    if (data.categoryId === "カテゴリの種類を選択" || data.categoryId === "") {
      alert("カテゴリを選択してください。");
      return;
    }
    changeTodo({
      variables: {
        title: data.todoTitle,
        categoryId: data.categoryId,
      },
    });
    //入力完了→値のリセット
    reset({ todoTitle: "", categoryId: "" });
    router.push("/");
  };

  //読み込み中時の表示
  if (loading) {
    return <p>loding…</p>;
  }
  //エラー時の表示
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <div>
        {/* <div>元データ:{data && data.getTodo.title}</div>
        <div>カテゴリ:{data && data.getTodo.category.name}</div> */}
        <div className="w-96 border-solid border-2 border-gray-500 bg-stone-200 m-10 p-3 rounded-md">
          <div className="text-xl text-center">データの変更</div>
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
              onClick={handleSubmit(changeTodoData)}
              className="bg-yellow-500 px-5 py-2 rounded-md"
            >
              更新
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoFix;
