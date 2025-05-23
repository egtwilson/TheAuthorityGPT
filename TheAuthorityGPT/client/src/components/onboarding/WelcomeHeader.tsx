import React from 'react';
import { User } from '../../types/user';

interface Props {
  user: User;
}

export default function WelcomeHeader({ user }: Props) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-navy-900">
        Welcome to TheAuthorityGPT, {user.firstName}!
      </h1>
      <p className="mt-3 text-lg text-navy-600 max-w-2xl mx-auto">
        Let's get you started with everything you need to succeed. 
        Follow this simple checklist to make the most of your account.
      </p>
    </div>
  );
}
