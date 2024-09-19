import React, { useState, useEffect } from 'react';
import AddWork from '../../components/AddWork';
import ViewWork from '../../components/ViewWork';
import EditWork from '../../components/EditWork';

function CreateBoard() {
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Fetch saved board data from localStorage
  useEffect(() => {
    const savedBoard = localStorage.getItem('taskBoard');
    if (savedBoard) {
      const parsedBoard = JSON.parse(savedBoard);
      setBoardName(parsedBoard.boardName);
      setDescription(parsedBoard.description);
      setTasks(parsedBoard.tasks || []);
    }
  }, []);

  // Function to generate a unique ID (using Date.now as an example)
  const generateTaskId = () => `task-${Date.now()}`;

  const handleSubmitTask = (taskTitle, taskDescription, assignedTo, status) => {
    const newTask = {
      id: generateTaskId(), // Generate a new unique ID
      taskTitle,
      taskDescription,
      assignedTo,
      status,
      isEditingTask: false
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    setIsAddingTask(false);

    // Update localStorage
    localStorage.setItem('taskBoard', JSON.stringify({ boardName, description, tasks: updatedTasks }));
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleSubmitBoard = (e) => {
    e.preventDefault();

  
    localStorage.setItem('taskBoard', JSON.stringify({ boardName, description, tasks }));
  };

  const handleEditTaskSubmit = (taskId, taskTitle, taskDescription, assignedTo, status) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, taskTitle, taskDescription, assignedTo, status, isEditingTask: false }
        : task
    );
    setTasks(updatedTasks);

    localStorage.setItem('taskBoard', JSON.stringify({ boardName, description, tasks: updatedTasks }));
  };

  return (
    <div className="flex items-center">
      <form
        className="rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmitBoard}
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name your Board"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="border-2 rounded-lg w-full text-lg py-4 px-3 bg-zinc-100 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Board description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-b-2 border-gray-300 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              {!task.isEditingTask ? (
                <ViewWork
                  taskTitle={task.taskTitle}
                  assignedTo={task.assignedTo}
                  status={task.status}
                  onEditTask={() => {
                    const newTasks = [...tasks];
                    newTasks[index].isEditingTask = true;
                    setTasks(newTasks);
                  }}
                />
              ) : (
                <EditWork
                  onTaskSubmit={(taskTitle, taskDescription, assignedTo, status) =>
                    handleEditTaskSubmit(task.id, taskTitle, taskDescription, assignedTo, status)
                  }
                  title={task.taskTitle}
                  description={task.taskDescription}
                  assignedTo={task.assignedTo}
                  status={task.status}
                />
              )}
            </React.Fragment>
          ))}

          {isAddingTask ? (
            <AddWork
              onTaskSubmit={(taskTitle, taskDescription, assignedTo, status) =>
                handleSubmitTask(taskTitle, taskDescription, assignedTo, status)
              }
            />
          ) : (
            <button
              type="button"
              onClick={handleAddTask}
              className="text-gray-300 hover:text-gray-700 border-2 rounded-lg py-3 w-full text-md"
            >
              + Add Task
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-zinc-200 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Create Work Board
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBoard;
