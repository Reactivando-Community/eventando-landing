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

const event = {
  signup,
};

export default event;
