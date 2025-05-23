import React from 'react';
import { VaultItem, UserRole } from '../../types/expansions';
import VaultItemCard from './VaultItemCard';

interface Props {
  items: VaultItem[];
  userRole: UserRole;
}

export default function MonthlyDrops({ items, userRole }: Props) {
  const groupedByMonth = items.reduce((acc, item) => {
    const month = item.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {} as Record<string, VaultItem[]>);

  return (
    <div className="space-y-12">
      {Object.entries(groupedByMonth).map(([month, monthItems]) => (
        <div key={month}>
          <h2 className="text-2xl font-semibold text-navy-900 mb-6">{month}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthItems.map(item => (
              <VaultItemCard
                key={item.id}
                item={item}
                hasAccess={item.accessRoles.includes(userRole)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
