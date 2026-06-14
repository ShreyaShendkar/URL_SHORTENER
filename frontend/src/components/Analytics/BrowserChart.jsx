import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BrowserChart = ({ data = [] }) => {
  // Group browsers from analytics
  const browserMap = {};
  data.forEach((visit) => {
    const browser = visit.browser || "Unknown";
    browserMap[browser] = (browserMap[browser] || 0) + 1;
  });

  const chartData = Object.entries(browserMap)
    .map(([browser, count]) => ({
      name: browser,
      visits: count,
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 8); // Show top 8

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Browsers</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="visits" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrowserChart;
