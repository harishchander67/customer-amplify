/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItems = /* GraphQL */ `
  subscription OnCreateItems {
    onCreateItems {
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
export const onUpdateItems = /* GraphQL */ `
  subscription OnUpdateItems {
    onUpdateItems {
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
export const onDeleteItems = /* GraphQL */ `
  subscription OnDeleteItems {
    onDeleteItems {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      items
      mobileNumber
      created
      modified
    }
  }
`;
