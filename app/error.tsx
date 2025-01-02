'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Something went wrong!</h1>
        <p className="text-gray-600">
          An error occurred while loading the Pokemon data.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}