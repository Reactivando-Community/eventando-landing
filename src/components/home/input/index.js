const Input = ({ title, type, placeholder, onChange, value }) => {
  //   return (
  //     <div className="mb-4">
  //       <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
  //         {title}
  //       </label>
  //       <input
  //         type={type}
  //         placeholder={placeholder}
  //         className={`w-full px-3 py-2 text-gray-600 placeholder-gray-300 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring  "border-gray-300 focus:border-indigo-600 ring-indigo-100"`}
  //       />
  //     </div>
  //   );

  return (
    <div className="mb-4">
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <input
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        value={value}
        type={type}
        placeholder={placeholder}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};

export default Input;
