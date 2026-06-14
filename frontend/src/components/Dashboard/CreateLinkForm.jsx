import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import Button from "../Common/Button";
import Input from "../Common/Input";
import axiosInstance from "../../api/axiosConfig";

const CreateLinkForm = ({ onLinkCreated }) => {
  const [formData, setFormData] = useState({
    originalUrl: "",
    customAlias: "",
    expiresAt: "",
  });
  const [generatedLink, setGeneratedLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate URL
      if (!formData.originalUrl.trim()) {
        throw new Error("URL is required");
      }

      // Basic URL validation
      try {
        new URL(formData.originalUrl);
      } catch {
        throw new Error("Please enter a valid URL");
      }

      const payload = {
        originalUrl: formData.originalUrl,
      };

      if (formData.customAlias) {
        payload.customAlias = formData.customAlias;
      }

      if (formData.expiresAt) {
        payload.expiresAt = new Date(formData.expiresAt).toISOString();
      }

      const response = await axiosInstance.post("/api/urls/shorten", payload);

      setGeneratedLink(response.data.data);
      setFormData({ originalUrl: "", customAlias: "", expiresAt: "" });
      
      // Call parent callback to refresh links list
      if (onLinkCreated) {
        onLinkCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewLink = () => {
    setGeneratedLink(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Short Link</h2>

      {!generatedLink ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Original URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long URL <span className="text-red-500">*</span>
            </label>
            <Input
              type="url"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/very/long/url"
              disabled={loading}
            />
          </div>

          {/* Custom Alias */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Alias <span className="text-gray-400">(optional)</span>
            </label>
            <Input
              type="text"
              name="customAlias"
              value={formData.customAlias}
              onChange={handleInputChange}
              placeholder="my-awesome-link"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank for auto-generated alias
            </p>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expires At <span className="text-gray-400">(optional)</span>
            </label>
            <Input
              type="datetime-local"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleInputChange}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Link will be inactive after this date
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating..." : "Generate Short URL"}
          </Button>
        </form>
      ) : (
        /* Success State */
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-700 mb-3">
              ✓ Link created successfully!
            </p>

            <div className="space-y-4">
              {/* Short URL Display */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Short URL
                </label>
                <div className="flex items-center gap-2 bg-white border border-green-200 rounded-lg p-3">
                  <code className="text-sm font-mono text-green-700 flex-1 break-all">
                    {generatedLink.shortUrl}
                  </code>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <FiCheck className="w-5 h-5 text-green-600" />
                    ) : (
                      <FiCopy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Original URL Display */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Original URL
                </label>
                <p className="text-sm text-gray-700 break-all">
                  {generatedLink.originalUrl}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-green-100">
                  <p className="text-xs text-gray-600">Alias</p>
                  <p className="text-sm font-semibold text-gray-900 break-all">
                    {generatedLink.customAlias || "auto-generated"}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-100">
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="text-sm font-semibold text-green-700">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleNewLink}
              className="flex-1 bg-gray-100 text-gray-900 hover:bg-gray-200"
            >
              Create Another
            </Button>
            <Button type="button" className="flex-1">
              View Analytics
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateLinkForm;
