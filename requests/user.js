import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("/api/user/savecart", {
      cart,
      user_id,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const saveAddress = async (address, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      user_id,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};
