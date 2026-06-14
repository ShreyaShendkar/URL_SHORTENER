export const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600`}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center">{spinner}</div>;
};

export default LoadingSpinner;
