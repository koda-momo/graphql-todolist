import { gql } from "@apollo/client";

/**
 * Todoリスト全件取得.
 */
export const TODO_LIST = gql`
  {
    getAllTodo {
      id
      title
      finish
      category {
        id
        name
      }
    }
  }
`;

/**
 * Todoリスト1件+カテゴリ全データ取得.
 */
export const TODO_AND_Category = gql`
  query ($id: ID) {
    getTodo(id: $id) {
      title
      category {
        name
      }
    }
    getAllCategory {
      id
      name
    }
  }
`;

/**
 * Todoリスト追加.
 */
export const ADD_TODO = gql`
  mutation ($title: String, $categoryId: ID) {
    addTodo(title: $title, categoryId: $categoryId) {
      title
    }
  }
`;

/**
 * categoryリスト全件取得.
 */
export const CATEGORY_LIST = gql`
  {
    getAllCategory {
      id
      name
    }
  }
`;

/**
 * Todoの削除.
 */
export const DELETE_TODO = gql`
  mutation ($id: ID!) {
    deleteTodo(id: $id) {
      title
    }
  }
`;

/**
 * Todo完了.
 */
export const FINISH_TODO = gql`
  mutation ($id: ID!, $finish: Boolean) {
    finishTodo(id: $id, finish: $finish) {
      title
    }
  }
`;
