export const formatMoney = (value?: string) => {
  if (value) {
    return value.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }
  return 0;
};
