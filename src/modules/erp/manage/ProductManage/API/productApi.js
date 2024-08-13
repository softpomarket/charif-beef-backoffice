import { server } from "../../../../../constants";
import { httpClient } from "../../../../../utils/HttpClient";

// Property
const insertProductFetch = async (
  param,
  body,
  accessToken,
  productCategory
) => {
  // Done
  try {
    let url;
    switch (productCategory) {
      case "coconut":
        url = server.INSERT_COCONUT_URL;
        break;
      case "mango":
        url = server.INSERT_MANGO_URL;
        break;
      case "seasonal":
        url = server.INSERT_SEASONAL_URL;
        break;
      case "dried":
        url = server.INSERT_DRIED_URL;
        break;
      case "thammang":
        url = server.INSERT_THAMMANG_URL;
        break;
    }
    const result = await httpClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data;
  } catch (err) {
    // status 404
    return null;
  }
};

const insertPropertiesFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_PROPERTIES_URL, body, {
      headers: {
        "x-access-token": accessToken,
      },
    });
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const getAllCategories = async () => {
  try {
    const result = await httpClient.get(server.GET_CATEGORY_URL);
    if (result.data.status) {
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const getProductFetch = async (param, body, accessToken, productCategory) => {
  // Done
  try {
    let url;
    switch (productCategory) {
      case "coconut":
        url = server.GET_COCONUT_URL;
        break;
      case "mango":
        url = server.GET_MANGO_URL;
        break;
      case "seasonal":
        url = server.GET_SEASONAL_URL;
        break;
      case "dried":
        url = server.GET_DRIED_URL;
        break;
      case "thammang":
        url = server.GET_THAMMANG_URL;
        break;
    }
    const result = await httpClient.get(url + `?keyword=${param.keyword}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (result.data.status) {
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const getPropertiesFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.get(
      server.GET_PROPERTIES_URL +
        `?propertyTypeId=${param.propertyTypeId}&name=${param.name}&isActive=${param.isActive}&page=${param.page}&size=${param.size}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    if (result.data.isSuccess) {
      return result.data.formData;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const getPropertiesByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.get(
      server.GET_PROPERTIES_BY_ID_URL + `/${param.id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    if (result.data.isSuccess) {
      return result.data.formData;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const updateProductFetch = async (
  param,
  body,
  accessToken,
  productCategory
) => {
  let url;
  switch (productCategory) {
    case "coconut":
      url = server.UPDATE_COCONUT_BY_ID_URL;
      break;
    case "mango":
      url = server.UPDATE_MANGO_BY_ID_URL;
      break;
    case "seasonal":
      url = server.UPDATE_SEASONAL_BY_ID_URL;
      break;
    case "dried":
      url = server.UPDATE_DRIED_BY_ID_URL;
      break;
    case "thammang":
      url = server.UPDATE_THAMMANG_BY_ID_URL;
      break;
  }
  try {
    const result = await httpClient.put(url + `/${param.id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("UPDATE fetch", result);
    return result.data;
  } catch (err) {
    // status 404
    return null;
  }
};

const updatePropertiesFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.put(
      server.UPDATE_PROPERTIES_URL + `/${param.id}`,
      body,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const deleteProductByIdFetch = async (
  param,
  body,
  accessToken,
  productCategory
) => {
  try {
    let url;
    switch (productCategory) {
      case "coconut":
        url = server.DELETE_COCONUT_BY_ID_URL;
        break;
      case "mango":
        url = server.DELETE_MANGO_BY_ID_URL;
        break;
      case "seasonal":
        url = server.DELETE_SEASONAL_BY_ID_URL;
        break;
      case "dried":
        url = server.DELETE_DRIED_BY_ID_URL;
        break;
      case "thammang":
        url = server.DELETE_THAMMANG_BY_ID_URL;
        break;
    }
    const result = await httpClient.delete(url + `/${param.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("DELETE", result);
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const deletePropertiesByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_PROPERTIES_BY_ID_URL + `/${param.id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

export {
  // get
  getProductFetch,
  getPropertiesFetch,
  getPropertiesByIdFetch,
  getAllCategories,

  // insert
  insertProductFetch,
  insertPropertiesFetch,

  // update
  updatePropertiesFetch,
  updateProductFetch,

  // delete
  deleteProductByIdFetch,
  deletePropertiesByIdFetch,
};
