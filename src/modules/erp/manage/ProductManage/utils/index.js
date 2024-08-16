const obj = {
  coconut: "ผลิตภัณฑ์จากมะพร้าว",
  mango: "ผลิตภัณฑ์จากมะม่วง",
  seasonal: "ผลิตภัณฑ์จากผลไม้ตามฤดูกาล",
  dried: "ผลิตภัณฑ์ผลไม่อบแห้ง",
  thammang: "ผลิตภัณฑ์อื่นๆ",
};

export const title = (productCategory) => {
  return "จัดการ" + obj[productCategory];
};

export const searchTitle = (productCategory) => {
  return "ชื่อ" + obj[productCategory];
};

export const listTitle = (productCategory) => {
  return "รายการ" + obj[productCategory];
};

export const productName = (productCategory) => {
  return obj[productCategory];
};
