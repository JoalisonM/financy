import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: String!) {
    getTransaction(id: $transactionId) {
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

export const LIST_TRANSACTIONS = gql`
  query ListTransactions(
    $limit: Float
    $page: Float
    $to: String
    $from: String
    $categoryId: String
    $type: TYPE
    $description: String
  ) {
    listTransactions(
      limit: $limit
      page: $page
      to: $to
      from: $from
      categoryId: $categoryId
      type: $type
      description: $description
    ) {
      items {
        id
        description
        type
        amount
        date
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
      currentPage
      totalElements
      totalPages
    }
  }
`;
