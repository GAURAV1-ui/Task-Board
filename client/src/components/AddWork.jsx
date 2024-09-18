import React, { useState } from 'react';

const AddWork = (
  { onTaskSubmit,
    title='',
    description='',
    assignedTo='',
    status='To-Do'
   }
) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskAssignedTo, setTaskAssignedTo] = useState(assignedTo);
  const [taskStatus, setTaskStatus] = useState(status);

  const handleTaskSubmit = () => {
    if (taskTitle.trim()) {
      onTaskSubmit(taskTitle, taskDescription, taskAssignedTo, taskStatus);
      setTaskTitle('');
      setTaskDescription('');
      setTaskAssignedTo('');
      setTaskStatus('To-Do');
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
            value={taskAssignedTo}
            onChange={(e) => setTaskAssignedTo(e.target.value)}
            className="w-full p-2 border-b-2 border-white bg-inherit rounded-md focus:outline-none focus:shadow-outline"
            placeholder="Assign others with @"
          />
        </div>

        <div className="space-y-2 flex justify-between px-1">
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
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
