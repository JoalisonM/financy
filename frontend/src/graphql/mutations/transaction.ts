import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      id
      description
      type
      amount
      date
      categoryId
      category {
        id
        title
        description
        color
        icon
        createdAt
        countTransactions
      }
      user {
        id
        name
        email
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $transactionId: String!
    $data: TransactionInput!
  ) {
    updateTransaction(id: $transactionId, data: $data) {
      id
      description
      type
      amount
      date
      categoryId
      category {
        id
        title
        description
        color
        icon
        createdAt
        countTransactions
      }
      user {
        id
        name
        email
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: String!) {
    deleteTransaction(id: $transactionId)
  }
`;
