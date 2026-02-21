import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query GetCategory($categoryId: String!) {
    getCategory(id: $categoryId) {
      id
      title
      description
      color
      icon
      countTransactions
      transactionsAmount
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

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
      countTransactions
      transactionsAmount
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;
