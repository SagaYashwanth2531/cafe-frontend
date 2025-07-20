import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-indigo-800 text-white text-center py-4 mt-10">
      <h3 className="text-sm font-medium tracking-wide">
        © {new Date().getFullYear()} MERN App. All rights reserved.
      </h3>
    </footer>
  );
}
