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
