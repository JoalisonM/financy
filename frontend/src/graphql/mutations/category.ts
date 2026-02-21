import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryId: String!, $data: CategoryInput!) {
    updateCategory(id: $categoryId, data: $data) {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(id: $categoryId)
  }
`;
