import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const DeviceBreakdownChart = ({ data = [] }) => {
  // Group devices from analytics
  const deviceMap = {};
  data.forEach((visit) => {
    const device = visit.device || "Unknown";
    deviceMap[device] = (deviceMap[device] || 0) + 1;
  });

  const chartData = Object.entries(deviceMap).map(([device, count]) => ({
    name: device,
    value: count,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceBreakdownChart;
