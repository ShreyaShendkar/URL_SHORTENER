import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OSChart = ({ data = [] }) => {
  // Group operating systems from analytics
  const osMap = {};
  data.forEach((visit) => {
    const os = visit.os || "Unknown";
    osMap[os] = (osMap[os] || 0) + 1;
  });

  const chartData = Object.entries(osMap)
    .map(([os, count]) => ({
      name: os,
      visits: count,
    }))
    .sort((a, b) => b.visits - a.visits);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Systems</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis dataKey="name" type="category" width={100} stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Bar dataKey="visits" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OSChart;
