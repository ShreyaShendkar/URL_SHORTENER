import { FiCopy, FiTrash2, FiBarChart2, FiShare2, FiCheck } from "react-icons/fi";
import { useState } from "react";

const LinkTable = ({ links, onDelete, onAnalytics, loading }) => {
  const [copied, setCopied] = useState(null);

  const handleCopyLink = async (linkId, url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(linkId);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async (linkId) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      onDelete(linkId);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isExpired = (expiresAt) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 mt-3">Loading links...</p>
      </div>
    );
  }

  if (!links || links.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-2">No links yet</p>
        <p className="text-sm text-gray-500">
          Create your first short link to get started
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">
              Short URL
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">
              Original URL
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">
              Clicks
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">
              Created
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-6 py-4">
                <code className="text-sm font-mono text-blue-600 break-all">
                  {link.shortUrl}
                </code>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-700 max-w-xs truncate">
                  {link.originalUrl}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-gray-900">
                  {link.analytics?.length || 0}
                </p>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isExpired(link.expiresAt)
                      ? "bg-gray-100 text-gray-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isExpired(link.expiresAt) ? "Expired" : "Active"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatDate(link.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopyLink(link._id, link.shortUrl)}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
                    title="Copy link"
                  >
                    {copied === link._id ? (
                      <FiCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <FiCopy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onAnalytics(link._id)}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
                    title="View analytics"
                  >
                    <FiBarChart2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
                    title="Share link"
                  >
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(link._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete link"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
