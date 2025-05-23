import React, { useState } from 'react';
import { FileUploadForm as FormData, UploadResponse } from '../../types/admin';
import { FileCategory, UserRole } from '../../types/downloads';

const CATEGORIES: FileCategory[] = ['Toolkits', 'Checklists', 'Templates'];
const ROLES: UserRole[] = ['user', 'licensee', 'reseller'];

export default function FileUploadForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'Toolkits',
    accessRoles: [],
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<UploadResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // Mock API call
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          file: formData.file?.name, // Mock file handling
          uploadDate: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      setResponse(data);

      if (data.success) {
        setFormData({
          title: '',
          description: '',
          category: 'Toolkits',
          accessRoles: [],
          file: null,
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        message: 'Failed to upload file. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const toggleRole = (role: UserRole) => {
    setFormData(prev => ({
      ...prev,
      accessRoles: prev.accessRoles.includes(role)
        ? prev.accessRoles.filter(r => r !== role)
        : [...prev.accessRoles, role],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-navy-100">
      <h2 className="text-xl font-semibold text-navy-900 mb-6">
        Upload New File
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-navy-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-navy-300 
              shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 
              focus:border-yellow-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-navy-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border border-navy-300 
              shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 
              focus:border-yellow-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-navy-700">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={e => setFormData(prev => ({ 
              ...prev, 
              category: e.target.value as FileCategory 
            }))}
            className="mt-1 block w-full rounded-md border border-navy-300 
              shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 
              focus:border-yellow-500"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Access Roles */}
        <div>
          <span className="block text-sm font-medium text-navy-700 mb-2">
            Access Roles
          </span>
          <div className="space-y-2">
            {ROLES.map(role => (
              <label key={role} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.accessRoles.includes(role)}
                  onChange={() => toggleRole(role)}
                  className="rounded border-navy-300 text-yellow-500 
                    focus:ring-yellow-500"
                />
                <span className="ml-2 text-navy-700 capitalize">
                  {role}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-navy-700">
            File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-navy-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-yellow-50 file:text-yellow-700
              hover:file:bg-yellow-100"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 
              hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>

        {/* Response Message */}
        {response && (
          <div className={`rounded-md p-4 ${
            response.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {response.message}
          </div>
        )}
      </form>
    </div>
  );
}
