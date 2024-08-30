import api from "../api";

const signup = ({
  name,
  email,
  phoneNumber,
  additionalInformation,
  tShirtSize,
  paymentOption,
}) => {
  return api.post("/signup/1", {
    name: name,
    email: email,
    phone_number: phoneNumber,
    additional_information: additionalInformation,
    t_shirt_size: tShirtSize,
    payment_option: paymentOption,
  });
};

const getSaleDetails = ({ slug }) => {
  return api.get(
    `sales?populate[event][populate][0]=payment_option&filters[slug]=${slug}`
  );
};

const event = {
  signup,
  getSaleDetails,
};

export default event;
