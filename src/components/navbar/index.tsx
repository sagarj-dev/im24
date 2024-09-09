import React from "react";
import { GrGallery } from "react-icons/gr";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {

  return (
    <nav className="bg-gray-800 px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Link to={"/"} className="flex text-white text-4xl font-bold">
              <GrGallery />
              <p className="ml-4 text-2xl">Product Gallery</p>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
