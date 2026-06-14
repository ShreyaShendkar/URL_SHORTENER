import { FiClock, FiGlobe } from "react-icons/fi";

const VisitTimeline = ({ data = [] }) => {
  const recentVisits = data.slice(-20).reverse(); // Show last 20 visits

  if (recentVisits.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
        <p className="text-gray-500">No visits yet</p>
      </div>
    );
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
      <div className="space-y-3">
        {recentVisits.map((visit, idx) => (
          <div key={idx} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0">
            <div className="mt-1">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <FiGlobe className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {visit.browser} on {visit.os}
                </p>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {visit.device}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {formatTime(visit.timestamp)}
                </span>
                <span>{formatDate(visit.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitTimeline;
