import React from 'react';
import { PaymentError } from '../../types/payment';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  error: PaymentError;
  onDismiss: () => void;
}

export default function PaymentStatus({ error, onDismiss }: Props) {
  return (
    <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4">
      <div className="flex items-start">
        <XCircleIcon className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Payment Error
          </h3>
          <p className="mt-1 text-sm text-red-700">
            {error.message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-auto pl-3"
        >
          <span className="sr-only">Dismiss</span>
          <XCircleIcon className="h-5 w-5 text-red-400" />
        </button>
      </div>
    </div>
  );
}
