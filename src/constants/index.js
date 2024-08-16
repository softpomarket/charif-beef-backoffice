export const HTTP_BASKET_ORDER_FETCHING = "HTTP_BASKET_ORDER_FETCHING";
export const HTTP_BASKET_ORDER_SUCCESS = "HTTP_BASKET_ORDER_SUCCESS";
export const HTTP_BASKET_ORDER_FAILED = "HTTP_BASKET_ORDER_FAILED";

///////////////////////// Localization Begin /////////////////////////
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";
export const NETWORK_CONNECTION_MESSAGE = "NETWORK_CONNECTION_MESSAGE";

export const serverUrl = `${process.env.REACT_APP_API_URL}`;
export const apiServerUrl = serverUrl;

export const imgDefaultUrl = `./assets/images/default/df-img.png`;
export const videoDefaultUrl = `./assets/images/default/df-vdo.png`;
export const imgDefaltCardCourse = `./assets/images/default/df-card-course-img.png`;
export const img404notfound = `./assets/images/notfound/404notfound.jpg`;

export const paginate = 10000; // limit 10 k
export const sortASC = "ASC";
export const sortDESC = "DESC";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  // ------------------------ PROPERTIES -----------------------------------------------------
  GET_BANNERS_URL: `/api/v1/back-office/banner`,

  GET_BEST_SELLING_URL: `/api/v1/back-office/product/best-salling`,
  GET_PICKUPS_URL: `/api/v1/back-office/pickup`,
  GET_CATEGORY_URL: `/api/v1/truck/category`,
  GET_COCONUT_URL: `/api/v1/back-office/product/coconut`,
  GET_MANGO_URL: `/api/v1/back-office/product/mango`,
  GET_DRIED_URL: `/api/v1/back-office/product/dried`,
  GET_SEASONAL_URL: `/api/v1/back-office/product/seasonal`,
  GET_THAMMANG_URL: `/api/v1/back-office/product/thammang`,
  GET_PROPERTIES_URL: `/api/properties`,
  GET_PROPERTIES_BY_ID_URL: `/api/properties`,
  GET_HOMEPAGE_PROPERTIES_URL: `/api/homePage/properties`,
  GET_PROPERTY_DETAIL_PAGE_URL: `/api/propertyDetailPage`,

  INSERT_BANNERS_URL: `/api/v1/back-office/banner`,
  INSERT_PICKUP_URL: `/api/v1/back-office/pick-up`,
  INSERT_BEST_SELLING_URL: `/api/v1/back-office/product/best-salling`,
  INSERT_COCONUT_URL: `/api/v1/back-office/product/coconut`,
  INSERT_MANGO_URL: `/api/v1/back-office/product/mango`,
  INSERT_DRIED_URL: `/api/v1/back-office/product/dried`,
  INSERT_SEASONAL_URL: `/api/v1/back-office/product/seasonal`,
  INSERT_THAMMANG_URL: `/api/v1/back-office/product/thammang`,
  INSERT_BEST_SELLING_URL: `/api/v1/back-office/product/best-salling`,
  INSERT_PROPERTIES_URL: `/api/properties`,

  UPDATE_PROPERTIES_URL: `/api/properties`,
  UPDATE_PICKUP_URL: `/api/v1/back-office/pick-up`,
  UPDATE_BEST_SELLING_URL: `/api/v1/back-office/product/best-salling`,
  UPDATE_COCONUT_BY_ID_URL: `/api/v1/back-office/product/coconut`,
  UPDATE_MANGO_BY_ID_URL: `/api/v1/back-office/product/mango`,
  UPDATE_DRIED_BY_ID_URL: `/api/v1/back-office/product/dried`,
  UPDATE_SEASONAL_BY_ID_URL: `/api/v1/back-office/product/seasonal`,
  UPDATE_THAMMANG_BY_ID_URL: `/api/v1/back-office/product/thammang`,
  UPDATE_BANNERS_URL: `/api/v1/back-office/banner`,

  DELETE_PROPERTIES_BY_ID_URL: `/api/properties`,
  DELETE_BEST_SELLING_BY_ID_URL: `/api/v1/back-office/product/best-salling`,
  DELETE_PICKUP_BY_ID_URL: `/api/v1/back-office/pickup`,
  DELETE_COCONUT_BY_ID_URL: `/api/v1/back-office/product/coconut`,
  DELETE_MANGO_BY_ID_URL: `/api/v1/back-office/product/mango`,
  DELETE_DRIED_BY_ID_URL: `/api/v1/back-office/product/dried`,
  DELETE_SEASONAL_BY_ID_URL: `/api/v1/back-office/product/seasonal`,
  DELETE_THAMMANG_BY_ID_URL: `/api/v1/back-office/product/thammang`,
  DELETE_BANNERS_URL: `/api/v1/back-office/banner`,

  // ------------------------ PROPERTIES TYPE ------------------------------------------------
  GET_PROPERTY_TYPES_URL: `/api/propertyTypes`,
  GET_PROPERTY_TYPES_BY_ID_URL: `/api/propertyTypes`,

  INSERT_PROPERTY_TYPES_URL: `/api/propertyTypes`,

  UPDATE_PROPERTY_TYPES_URL: `/api/propertyTypes`,

  DELETE_PROPERTY_TYPES_BY_ID_URL: `/api/propertyTypes`,

  // ------------------------ PROPERTIES IMAGE -----------------------------------------------
  INSERT_PROPERTY_IMAGE_URL: `/api/property-images`,

  DELETE_PROPERTY_IMAGE_BY_ID_URL: `/api/property-images`,

  // ------------------------ ERP ------------------------------------------------------------
  GET_ERP_SIGNIN_ID_URL: `/api/v1/auth/sign-in`,
  GET_ERP_SIGNUP_ID_URL: `/api/auth/signup`,
  GET_ERP_SIGNOUT_ID_URL: `/api/auth/signOut`,
  GET_ERP_LIST_URL: ``,
};
