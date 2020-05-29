/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItems = /* GraphQL */ `
  query GetItems($id: ID!) {
    getItems(id: $id) {
      id
      title
      description
      tags
      category
      price
      imageKeys
      created
      modified
      quantity
      promotions
      media
      labels
    }
  }
`;
export const listItemss = /* GraphQL */ `
  query ListItemss(
    $filter: ModelitemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        tags
        category
        price
        imageKeys
        created
        modified
        quantity
        promotions
        media
        labels
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelorderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        items
        mobileNumber
        created
        modified
      }
      nextToken
    }
  }
`;
export const searchItemss = /* GraphQL */ `
  query SearchItemss(
    $filter: SearchableitemsFilterInput
    $sort: SearchableitemsSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchItemss(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        tags
        category
        price
        imageKeys
        created
        modified
        quantity
        promotions
        media
        labels
      }
      nextToken
      total
    }
  }
`;
export const searchOrders = /* GraphQL */ `
  query SearchOrders(
    $filter: SearchableorderFilterInput
    $sort: SearchableorderSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchOrders(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        items
        mobileNumber
        created
        modified
      }
      nextToken
      total
    }
  }
`;
