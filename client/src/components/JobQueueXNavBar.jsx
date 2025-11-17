import React from 'react';
import { Link } from 'react-router-dom';

const JobQueueXNavBar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#0B1226]">
        <Link to="/" className="hover:text-[#2F6CFF] transition-colors">JobQueueX</Link>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-[#0B1226] font-medium hover:text-[#2F6CFF]">Home</Link>
        <Link to="/features" className="text-[#0B1226] font-medium hover:text-[#2F6CFF]">Features</Link>
        <Link to="/dashboard" className="text-[#0B1226] font-medium hover:text-[#2F6CFF]">Dashboard</Link>
        <Link to="/docs" className="text-[#0B1226] font-medium hover:text-[#2F6CFF]">Docs</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/signin" className="text-[#0B1226] font-medium hover:text-[#2F6CFF]">Login</Link>
        <Link to="/register" className="bg-[#2F6CFF] text-white font-bold py-2 px-4 rounded-full hover:bg-[#1a56d4] transition-colors">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default JobQueueXNavBar;