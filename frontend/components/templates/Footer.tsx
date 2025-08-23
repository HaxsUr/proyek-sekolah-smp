import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Muhammad Ramadhan. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};