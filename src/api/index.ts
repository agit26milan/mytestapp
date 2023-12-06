import axios from 'axios';

const baseURL = 'https://auntieanne-demo.proseller.io/product/api';

export const getListMenu = async (id: string) => {
  const url = `/productpreset/loadcategory/webOrdering/${id}`;
  return await axios({method: 'get', baseURL, url});
};

export const getSublistMenu = async (companyId: string, id: string) => {
  const url = `/productpreset/loaditems/webOrdering/${companyId}/${id}`;
  return await axios({method: 'get', baseURL, url});
};
