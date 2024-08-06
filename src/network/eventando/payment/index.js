import api from "../api";

const detail = ({ id }) => {
  return api.get(`/payments/${id}`);
};

const payment = {
  detail,
};

export default payment;
