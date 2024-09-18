import React, { useState } from 'react';

const AddWork = ({ onTaskSubmit }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('To-Do');

  const handleTaskSubmit = () => {
    if (taskTitle.trim()) {
      // Pass the data to the parent component (CreateBoard)
      onTaskSubmit(taskTitle, taskDescription, assignedTo, status);

      // Reset the form fields
      setTaskTitle('');
      setTaskDescription('');
      setAssignedTo('');
      setStatus('To-Do');
    }
  };

  return (
    <div className="bg-zinc-100 shadow-lg rounded-lg p-4 mb-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full p-2 border-b-2 border-white  bg-transparent  rounded-md focus:outline-none focus:shadow-outline"
            placeholder="Task Title"
            required
          />
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-2 border-b-2 border-white bg-transparent rounded-md focus:outline-none focus:shadow-outline"
            placeholder="Task Description (optional)"
          />
        </div>

        <div className="space-y-2">
          <input
            type="email"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border-b-2 border-white bg-inherit rounded-md focus:outline-none focus:shadow-outline"
            placeholder="Assign others with @"
          />
        </div>

        <div className="space-y-2 flex justify-between px-1">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-xs text-zinc-400 bg-inherit focus:outline-none focus:shadow-outline"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
          type="button"
          onClick={handleTaskSubmit}
          className="text-xs  text-zinc-400 focus:outline-none focus:shadow-outline"
        >
          Enter to Save & add New Task
        </button>
        </div>

        
      </div>
    </div>
  );
};

export default AddWork;
