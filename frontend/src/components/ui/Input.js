const Input = ({ id, type, placeholder, value, onChange, required }) => (
  <input
    id={id}
    type={type}
    placeholder=" " // Ensure placeholder is a space for label positioning
    value={value}
    onChange={onChange}
    required={required}
    className="peer w-full px-3 pt-3 pb-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none
               focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out placeholder-transparent"
  />
);

export default Input;