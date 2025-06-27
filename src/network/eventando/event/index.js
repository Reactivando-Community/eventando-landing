import api from "../api";

const signup = ({
  name,
  email,
  phoneNumber,
  additionalInformation,
  tShirtSize,
  paymentOption,
}) => {
  return api.post("/signup/2", {
    name: name,
    email: email,
    phone_number: phoneNumber,
    additional_information: additionalInformation,
    t_shirt_size: tShirtSize,
    payment_option: paymentOption,
  });
};

const getSaleDetail = ({ slug }) => {
  return api.get(
    `sales?populate[event][populate][0]=payment_option&filters[slug]=${slug}`
  );
};

const getAllProducts = () => api.get(`events/2?populate[0]=payment_option`);

const event = {
  signup,
  getSaleDetail,
  getAllProducts
};

export default event;
