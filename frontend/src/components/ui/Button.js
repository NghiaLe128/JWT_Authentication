const Button = ({ type, text }) => (
  <button
    type={type}
    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out font-semibold"
  >
    {text}
  </button>
);

export default Button;
