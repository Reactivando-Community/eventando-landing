const Button = ({ title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {title}
    </button>
  );
};

const Outline = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      {title}
    </button>
  );
};

Button.Outline = Outline;

export default Button;
