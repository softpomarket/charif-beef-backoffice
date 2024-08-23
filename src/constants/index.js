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

  GET_BEEF_URL: `/api/v1/back-office/beef`,
  GET_HOMEPAGE_PROPERTIES_URL: `/api/homePage/properties`,
  GET_PROPERTY_DETAIL_PAGE_URL: `/api/propertyDetailPage`,

  INSERT_BANNERS_URL: `/api/v1/back-office/banner`,
  INSERT_PICKUP_URL: `/api/v1/back-office/pick-up`,
  INSERT_BEST_SELLING_URL: `/api/v1/back-office/product/best-salling`,
  INSERT_COCONUT_URL: `/api/v1/back-office/product/coconut`,
  INSERT_BEEF_URL: `/api/v1/back-office/beef`,

  INSERT_BEST_SELLING_URL: `/api/v1/back-office/product/best-salling`,
  INSERT_PROPERTIES_URL: `/api/properties`,

  UPDATE_BEEF_BY_ID_URL: `/api/v1/back-office/beef`,

  // ------------------------ PROPERTIES TYPE ------------------------------------------------
  GET_PROPERTY_TYPES_URL: `/api/propertyTypes`,
  GET_PROPERTY_TYPES_BY_ID_URL: `/api/propertyTypes`,

  INSERT_PROPERTY_TYPES_URL: `/api/propertyTypes`,

  UPDATE_PROPERTY_TYPES_URL: `/api/propertyTypes`,

  DELETE_PROPERTY_TYPES_BY_ID_URL: `/api/propertyTypes`,
  DELETE_BEEF_BY_ID_URL: `/api/v1/back-office/beef`,

  // ------------------------ PROPERTIES IMAGE -----------------------------------------------
  INSERT_PROPERTY_IMAGE_URL: `/api/property-images`,

  DELETE_PROPERTY_IMAGE_BY_ID_URL: `/api/property-images`,

  // ------------------------ ERP ------------------------------------------------------------
  GET_ERP_SIGNIN_ID_URL: `/api/v1/auth/sign-in`,
  GET_ERP_SIGNUP_ID_URL: `/api/auth/signup`,
  GET_ERP_SIGNOUT_ID_URL: `/api/auth/signOut`,
  GET_ERP_LIST_URL: ``,
};
