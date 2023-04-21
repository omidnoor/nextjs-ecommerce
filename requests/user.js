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

export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete("/api/user/deleteAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const applyCoupon = async (coupon) => {
  try {
    const { data } = await axios.post("/api/user/applyCoupon", {
      coupon,
    });
    return { ...data, success: true };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while applying the coupon. Please try again later.";
    return { success: false, errorMessage };
  }
};
