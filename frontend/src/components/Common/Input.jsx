export const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  name,
  error,
  disabled = false,
  className = "",
  required = false,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors ${
          error ? "border-red-500" : ""
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
