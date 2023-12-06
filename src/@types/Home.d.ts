declare namespace Home {
  interface ResponseListMenu {
    name: string;
    sequence: number;
    itemType: string;
    id: string;
    categoryID: string;
  }
  interface ResponseSubMenu {
    id: string;
    name: string;
    itemType: string;
    productID: string;
    sequence: number;
    product: {
      id: string;
      name: string;
      retailPrice: number;
      categoryName: string;
      orderingStatus: string;
      code: string;
      orderingAvaibility: {
        storePickUp: boolean;
        delivery: boolean;
        storeCheckOut: boolean;
        takeAway: boolean;
        dineIn: boolean;
      };
      productModifiers: ModifierProduct[];
      defaultImageURL: string;
      description: string;
    };
  }
  interface ModifierProduct {
    modifierID: string;
    sequence: number;
    modifierName: string;
    modifier: {
      dataIndex: number;
      isSelectAllItem: boolean;
      yesNoDefaultValue: boolean;
      createdBy: string;
      name: string;
      code: string;
      partitionKey: string;
      deleted: boolean;
      sortKey: string;
      createdOn: string;
      modifiedOn: string;
      dataSyncs: string[];
      details: ModifierProductDetail[];
      id: string;
      modifiedBy: string;
    };
  }
  interface ModifierProductDetail {
    name: string;
    isSelected: boolean;
    id: string;
    productID: string;
    productPrice: number;
    price: number;
    modifierID: string;
    orderingStatus: string;
  }
}
