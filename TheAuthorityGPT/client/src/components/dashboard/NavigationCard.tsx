import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

export default function NavigationCard({ 
  title, 
  description, 
  link, 
  icon 
}: NavigationCardProps) {
  return (
    <Link 
      to={link}
      className="card hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start space-x-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="heading-3">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
