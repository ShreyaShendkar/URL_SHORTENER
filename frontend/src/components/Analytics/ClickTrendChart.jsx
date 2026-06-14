import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ClickTrendChart = ({ data = [] }) => {
  // Group clicks by day if we have recent visits
  const groupedData = data.reduce((acc, visit) => {
    const date = new Date(visit.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.clicks += 1;
    } else {
      acc.push({ date, clicks: 1 });
    }
    return acc;
  }, []);

  // If no data, show placeholder
  if (groupedData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={groupedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClickTrendChart;
