const { useState } = require("react");

const Select = ({ title, options, onChange }) => {
  const [selected, setSelected] = useState(options[0].value);

  return (
    <div className="mb-4">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <select
        onChange={(e) => {
          console.log("event: ", e.target.value);

          if (onChange) {
            onChange(e.target.value);
          }

          setSelected(e.target.value);
        }}
        id="communities"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map(({ value, label }) => {
          return (
            <option selected={selected === value} key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
