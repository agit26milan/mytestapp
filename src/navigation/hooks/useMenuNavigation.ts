import React from 'react';
import {getListMenu} from '../../api';
import {COMPANY_ID} from '../../constant';
const useMenuNavigation = () => {
  const [listMenu, setListMenu] = React.useState<Home.ResponseListMenu[]>([]);
  const getListCategory = async () => {
    try {
      const response = await getListMenu(COMPANY_ID);
      const {data} = response;
      setListMenu(data.data);
    } catch (e) {}
  };

  return {
    listMenu,
    getListCategory,
  };
};

export default useMenuNavigation;
