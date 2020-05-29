/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItems = /* GraphQL */ `
  mutation CreateItems(
    $input: CreateItemsInput!
    $condition: ModelitemsConditionInput
  ) {
    createItems(input: $input, condition: $condition) {
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
export const updateItems = /* GraphQL */ `
  mutation UpdateItems(
    $input: UpdateItemsInput!
    $condition: ModelitemsConditionInput
  ) {
    updateItems(input: $input, condition: $condition) {
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
export const deleteItems = /* GraphQL */ `
  mutation DeleteItems(
    $input: DeleteItemsInput!
    $condition: ModelitemsConditionInput
  ) {
    deleteItems(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelorderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelorderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelorderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
