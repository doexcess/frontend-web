import { capitalize } from 'lodash';
import React from 'react';

const Select = ({
  name,
  className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  data,
  required,
  value,
  onChange,
  multiple,
}: SelectProps) => {
  return (
    <>
      <select
        id={name}
        defaultValue={data[0]}
        className={className}
        value={value}
        onChange={onChange}
        required={required}
        multiple={multiple}
      >
        {data.map((value) => (
          <option key={value} value={value}>
            {value === '*' ? 'All' : capitalize(value)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
