import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className="relative z-10 flex justify-between items-center px-4 py-3 md:px-8 md:py-4 bg-white shadow-md">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">My WorkBoards</h1>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-3 md:space-x-4">
        <a href="#" className="text-sm md:text-base text-gray-500 hover:text-gray-700">
          Assigned to Me
        </a>
        <button className="text-sm md:text-base text-gray-600 hover:text-gray-800">
          Logout
        </button>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
          Y
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-2 md:hidden">
          <a href="#" className="block w-full text-right px-4 py-2 text-gray-600 hover:text-gray-800">
            Assigned to Me
          </a>
          <a href="#" className="block w-full text-right px-4 py-2 text-gray-600 hover:text-gray-800">
            Profile
          </a>
          <button className="block w-full text-right px-4 py-2 text-gray-600 hover:text-gray-800">
            Logout
          </button>
        </div>
      )}
    </header>
    </div>
  );
}

export default Navbar;
