import { useState } from "react";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Form, Formik } from "formik";

import { countries } from "@/data/countries";
import ShippingInput from "@/components/inputs/shippingInputs";

import styles from "./styles.module.scss";
import SinglularSelect from "@/components/selects/SinglularSelect";

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
    .phone()
    .required("Phone number is required.")
    .min(3, "Phone number must be atleast 3 characters long.")
    .max(30, "Phone number must be less than 20 characters long."),
  state: Yup.string()
    .required("State name is required.")
    .min(2, "State name should contain 2-60 characters..")
    .max(60, "State name should contain 2-60 characters."),
  city: Yup.string()
    .required("City name is required.")
    .min(2, "City name should contain 2-60 characters.")
    .max(60, "City name should contain 2-60 characters."),
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
  country: Yup.string().required("Country name is required."),
});

export default function Shipping({
  selectedAddress,
  setSelectedAddress,
  user,
}) {
  const [address, setAddress] = useState(user?.address || []);
  const [shipping, setShipping] = useState(initialValues);

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
    setShipping({ ...shipping, [name]: value });
  };

  return (
    <div className={styles.shipping}>
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
      >
        {(formik) => (
          <Form>
            <SinglularSelect
              name="country"
              value={country}
              placeholder="Country"
              handlerChange={onChangeHandler}
              data={countries}
            />

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
    </div>
  );
}
