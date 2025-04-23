// components/Button.jsx
function Button({ text, type = "submit", onClick, className = "" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full py-2 rounded text-white bg-blue-500 hover:bg-blue-600 ${className}`}
      >
        {text}
      </button>
    );
  }
  
  export default Button;
