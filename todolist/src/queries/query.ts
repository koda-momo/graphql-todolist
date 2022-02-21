import { gql } from "@apollo/client";

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

export const ADD_TODO = gql`
  mutation ($title: String, $categoryId: ID) {
    addTodo(title: $title, categoryId: $categoryId) {
      title
    }
  }
`;

export const CATEGORY_LIST = gql`
  {
    getAllCategory {
      id
      name
    }
  }
`;
