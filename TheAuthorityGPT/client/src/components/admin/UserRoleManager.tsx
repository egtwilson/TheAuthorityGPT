import React, { useState, useEffect } from 'react';
import { AdminUser, RoleUpdateResponse } from '../../types/admin';
import { UserRole } from '../../types/user';

const ROLES: UserRole[] = ['user', 'licensee', 'reseller'];

export default function UserRoleManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [notification, setNotification] = useState<RoleUpdateResponse | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [roleFilter, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    if (roleFilter === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === roleFilter));
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    setUpdating(userId);
    setNotification(null);

    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data: RoleUpdateResponse = await response.json();
      setNotification(data);

      if (data.success && data.user) {
        setUsers(users.map(user => 
          user.id === userId ? data.user! : user
        ));
      }
    } catch (error) {
      setNotification({
        success: false,
        message: 'Failed to update user role. Please try again.',
      });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-navy-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-navy-900">
            User Role Manager
          </h2>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
            className="rounded-md border border-navy-300 shadow-sm py-2 px-3
              focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="all">All Roles</option>
            {ROLES.map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}s
              </option>
            ))}
          </select>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-4 rounded-md p-4 ${
            notification.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {notification.message}
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-navy-200">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  New Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-navy-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-navy-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-navy-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-navy-100 text-navy-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        defaultValue={user.role}
                        onChange={(e) => {
                          const newRole = e.target.value as UserRole;
                          if (newRole !== user.role) {
                            updateUserRole(user.id, newRole);
                          }
                        }}
                        disabled={updating === user.id}
                        className="rounded-md border border-navy-300 shadow-sm py-1 px-2
                          focus:outline-none focus:ring-yellow-500 focus:border-yellow-500
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {ROLES.map(role => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-500">
                      {updating === user.id ? (
                        <span className="text-yellow-500">Updating...</span>
                      ) : (
                        <span className="text-navy-400">
                          Last active: {new Date(user.lastActive).toLocaleDateString()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
