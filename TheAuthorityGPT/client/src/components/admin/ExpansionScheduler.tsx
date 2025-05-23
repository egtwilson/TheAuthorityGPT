import React, { useState, useEffect } from 'react';
import { ExpansionDrop, DropSchedulerForm, ScheduleResponse } from '../../types/expansions';
import { UserRole } from '../../types/downloads';

const ROLES: UserRole[] = ['user', 'licensee', 'reseller'];

export default function ExpansionScheduler() {
  const [formData, setFormData] = useState<DropSchedulerForm>({
    title: '',
    description: '',
    file: null,
    releaseDate: '',
    accessRoles: [],
  });

  const [scheduledDrops, setScheduledDrops] = useState<ExpansionDrop[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ScheduleResponse | null>(null);

  // Mock fetch scheduled drops
  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const response = await fetch('/api/admin/drops');
        const data = await response.json();
        setScheduledDrops(data.drops);
      } catch (error) {
        console.error('Failed to fetch scheduled drops:', error);
      }
    };

    fetchDrops();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const response = await fetch('/api/admin/drops/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          file: formData.file?.name, // Mock file handling
        }),
      });

      const data = await response.json();
      setResponse(data);

      if (data.success) {
        setFormData({
          title: '',
          description: '',
          file: null,
          releaseDate: '',
          accessRoles: [],
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        message: 'Failed to schedule drop. Please try again.',
      });
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-8">
      {/* Scheduler Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-navy-100">
        <h2 className="text-xl font-semibold text-navy-900 mb-6">
          Schedule New Drop
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

          {/* Release Date */}
          <div>
            <label htmlFor="releaseDate" className="block text-sm font-medium text-navy-700">
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              value={formData.releaseDate}
              onChange={e => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-navy-300 
                shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 
                focus:border-yellow-500"
              required
            />
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
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                file: e.target.files?.[0] || null 
              }))}
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
              {loading ? 'Scheduling...' : 'Schedule Drop'}
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

      {/* Scheduled Drops List */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-100">
        <div className="px-6 py-4 border-b border-navy-100">
          <h2 className="text-xl font-semibold text-navy-900">
            Scheduled Drops
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-navy-200">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Release Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Access Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-navy-200">
              {scheduledDrops.map(drop => (
                <tr key={drop.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-900">
                    {drop.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-500">
                    {new Date(drop.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-500">
                    {drop.accessRoles.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${drop.status === 'released' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'}`}>
                      {drop.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
