import React from 'react';

const ViewWork = ({ taskTitle, status, assignedTo, onEditTask }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-purple-100 rounded-lg mb-4 shadow">
      <div>
        <p className="text-lg font-semibold">{taskTitle}</p>
        <p className="text-xs text-gray-500">{status}</p>
      </div>

      <div>
        <button
          className="bg-transparent text-xs text-gray-500 border-none rounded-md hover:underline"
          onClick={onEditTask}
        >
          Edit
        </button>
        <span className="w-8 h-8 flex items-center justify-center bg-purple-200 text-purple-800 font-semibold rounded-full">
          {assignedTo.charAt(0).toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default ViewWork;
