import { FiCopy, FiTrash2, FiBarChart2, FiShare2, FiCheck } from "react-icons/fi";
import { useState } from "react";

const LinkCard = ({ link, onDelete, onAnalytics }) => {
  const [copied, setCopied] = useState(false);
  const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
  const clicks = link.analytics?.length || 0;
  const uniqueVisitors = new Set(link.analytics?.map((a) => a.ip) || []).size;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      onDelete(link._id);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-mono font-semibold text-blue-600 break-all">
                {link.shortUrl}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isExpired
                    ? "bg-gray-100 text-gray-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isExpired ? "Expired" : "Active"}
              </span>
            </div>
            <p className="text-xs text-gray-600 break-all mb-2">
              {link.originalUrl.length > 60
                ? link.originalUrl.substring(0, 60) + "..."
                : link.originalUrl}
            </p>
            {link.customAlias && (
              <p className="text-xs text-gray-500">
                Alias: <span className="font-medium">{link.customAlias}</span>
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{clicks}</p>
            <p className="text-xs text-gray-600">Clicks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{uniqueVisitors}</p>
            <p className="text-xs text-gray-600">Visitors</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-900 font-medium">
              {link.expiresAt ? formatDate(link.expiresAt) : "Never"}
            </p>
            <p className="text-xs text-gray-600">Expires</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleCopyLink}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Copy link"
          >
            {copied ? (
              <FiCheck className="w-5 h-5 text-green-600" />
            ) : (
              <FiCopy className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onAnalytics(link._id)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="View analytics"
          >
            <FiBarChart2 className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Share link"
          >
            <FiShare2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete link"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
