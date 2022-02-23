import { gql } from "@apollo/client";

/**
 * 全Todo,全カテゴリを取得.
 */
export const ALL_LIST = gql`
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
    getAllCategory {
      id
      name
    }
  }
`;

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
export const TODO_AND_CATEGRY = gql`
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
 * カテゴリリスト全件取得.
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

/**
 * Todo変更.
 */
export const UPDATE_TODO = gql`
  mutation ($id: ID!, $title: String, $categoryId: ID) {
    updateTodo(id: $id, title: $title, categoryId: $categoryId) {
      title
    }
  }
`;
