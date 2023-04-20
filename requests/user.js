import axios from "axios";

export const saveCart = async (cart) => {
  try {
    const { data } = await axios.post("/api/user/savecart", {
      cart,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const changeActive = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};
