import { useState } from "react";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Form, Formik } from "formik";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { CgRemove } from "react-icons/cg";

import { countries } from "@/data/countries";
import ShippingInput from "@/components/inputs/shippingInputs";
import SinglularSelect from "@/components/selects/SinglularSelect";
import { changeActive, deleteAddress, saveAddress } from "@/requests/user";
import { GiPhone } from "react-icons/gi";

import styles from "./styles.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

const initialValues = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phoneNumber: "",
};

Yup.addMethod(Yup.string, "phone", function () {
  return this.test("phone", "Invalid phone number", function (value) {
    const phoneNumber = parsePhoneNumberFromString(value);
    return phoneNumber ? phoneNumber.isValid() : false;
  });
});

const validate = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .min(3, "First name must be atleast 3 characters long.")
    .max(20, "First name must be less than 20 characters long."),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(3, "Last name must be atleast 3 characters long.")
    .max(20, "Last name must be less than 20 characters long."),
  phoneNumber: Yup.string()
    .required("Phone number is required.")
    .min(3, "Phone number must be atleast 3 characters long.")
    .max(30, "Phone number must be less than 20 characters long."),
  state: Yup.string()
    .required("State is required.")
    .min(2, "State should contain 2-60 characters..")
    .max(60, "State should contain 2-60 characters."),
  city: Yup.string()
    .required("City is required.")
    .min(2, "City should contain 2-60 characters.")
    .max(60, "City should contain 2-60 characters."),
  zipCode: Yup.string()
    .required("ZipCode/Postal is required.")
    .min(2, "ZipCode/Postal should contain 2-30 characters..")
    .max(30, "ZipCode/Postal should contain 2-30 characters."),
  address1: Yup.string()
    .required("Address Line 1 is required.")
    .min(5, "Address Line 1 should contain 5-100 characters.")
    .max(100, "Address Line 1 should contain 5-100 characters."),
  address2: Yup.string()
    .min(5, "Address Line 2 should contain 5-100 characters.")
    .max(100, "Address Line 2 should contain 5-100 characters."),
  country: Yup.string().required("Country is required."),
});

export default function Shipping({ user }) {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(!user?.address.length);
  const [addresses, setAddresses] = useState(user?.address || []);
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zipCode,
    country,
    phoneNumber,
  } = shipping;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    console.log(res);
    if (res && res.addresses) {
      setAddresses(res.addresses);
    }
  };

  const changeActiveHandler = async (id) => {
    const res = await changeActive(id);
    // console.log(res);
    if (res && res.addresses) {
      setAddresses(res.addresses);
    }
  };

  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    // console.log(res);
    setAddresses(res.addresses);
  };

  return (
    <div className={styles.shipping}>
      <div className={styles.addresses}>
        {addresses.map((address, index) => (
          <div
            key={index}
            className={`${styles.address} ${address.active && styles.active}`}
            onClick={() => changeActiveHandler(address._id)}
          >
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address._id)}
            >
              <CgRemove />
            </div>
            <div className={styles.address__side}>
              <img src={user.image} alt="user image" />
            </div>
            <div className={styles.address__col}>
              <span>
                <FaIdCard /> {address.firstName.toUpperCase()}{" "}
                {address.lastName.toUpperCase()}{" "}
              </span>
              <span>
                <GiPhone /> {address.phoneNumber}{" "}
              </span>
            </div>

            <div className={styles.address__col}>
              <span>
                <FaMapMarkerAlt />
                {address.address1}{" "}
              </span>
              <span>{address.address2} </span>
              <span>
                {address.city} {address.state} {address.country}{" "}
                {address.zipCode}
              </span>
            </div>
            <span
              className={styles.active_text}
              style={{
                display: `${!address.active ? "none" : "block"}`,
              }}
            >
              Active
            </span>
          </div>
        ))}
      </div>
      <button
        className={styles.hide_show}
        onClick={(prev) => setVisible(!visible)}
      >
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />{" "}
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />{" "}
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            zipCode,
            country,
            phoneNumber,
          }}
          validationSchema={validate}
          onSubmit={() => saveShippingHandler()}
        >
          {(formik) => (
            <Form>
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="First Name"
                  onChange={onChangeHandler}
                />

                <ShippingInput
                  name="lastName"
                  placeholder="Last Name"
                  onChange={onChangeHandler}
                />
              </div>

              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="State/Province/Region"
                  onChange={onChangeHandler}
                />

                <ShippingInput
                  name="city"
                  placeholder="City"
                  onChange={onChangeHandler}
                />
              </div>

              <ShippingInput
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={onChangeHandler}
              />

              <SinglularSelect
                name="country"
                value={country}
                placeholder="Country"
                onChangeHandler={onChangeHandler}
                data={countries}
              />

              <ShippingInput
                name="zipCode"
                placeholder="Zip Code/Postal"
                onChange={onChangeHandler}
              />

              <ShippingInput
                name="address1"
                placeholder="Address1"
                onChange={onChangeHandler}
              />

              <ShippingInput
                name="address2"
                placeholder="Address2"
                onChange={onChangeHandler}
              />

              <button type="submit">Save Address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
