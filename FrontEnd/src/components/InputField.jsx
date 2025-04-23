// components/InputField.jsx
function InputField({ type, name, value, onChange, placeholder, required = true }) {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    );
  }
  
  export default InputField;
  