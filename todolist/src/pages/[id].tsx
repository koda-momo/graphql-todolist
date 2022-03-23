import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { TODO_AND_CATEGRY } from "../queries/query";
import { CategoryType } from "../types/type";
import { useForm } from "react-hook-form";
import { UPDATE_TODO, TODO_LIST } from "../queries/query";
import { useEffect } from "react";
import Link from "next/link";

const TodoFix: NextPage = () => {
  //ルーターリンク
  const router = useRouter();
  //URLの後ろからid取得
  const todoId = router.query.id;

  /**
   * Todo1件+カテゴリリスト取得.
   */
  const { loading, error, data } = useQuery(TODO_AND_CATEGRY, {
    variables: { id: todoId },
  });

  /**
   * react-hook-form.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({});

  //デフォルト値
  setValue("todoTitle", data?.getTodo.title);
  setValue("categoryId", data?.getTodo.category.id);

  /**
   * changeTodo後データ再読み込み.
   */
  const [changeTodo] = useMutation(UPDATE_TODO, {
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
        id: todoId,
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
    <>
      <div className="relative">
        <div className="w-96 border-solid border-2 border-gray-500 bg-stone-200 p-3 rounded-md m-auto fixed left-0 right-0 top-36">
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
          <Link href="/">
            <a>←戻る</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TodoFix;
