import type { NextPage } from "next";
import { TodoList } from "../components/TodoList";
import { useQuery } from "@apollo/client";
import {} from "../components/AddTodo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { TODO_ITEM } from "../queries/query";

const TodoFix: NextPage = () => {
  //ルーターリンク
  const router = useRouter();
  //URLの後ろからid取得
  const todoId = router.query.id;

  const { loading, error, data } = useQuery(TODO_ITEM, {
    variables: { id: todoId },
  });

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
      <div>{data && data.getTodo.title}</div>
    </>
  );
};

export default TodoFix;
