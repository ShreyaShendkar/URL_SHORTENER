const MetricsBox = ({ icon: Icon, label, value, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={`text-sm mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last week
        </p>
      )}
    </div>
  );
};

export default MetricsBox;
