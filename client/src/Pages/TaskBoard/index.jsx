import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ViewWork from '../../components/ViewWork';
import EditWork from '../../components/EditWork';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const savedBoard = localStorage.getItem('taskBoard');
    if (savedBoard) {
      const parsedBoard = JSON.parse(savedBoard);
      setBoardName(parsedBoard.boardName || '');
      setDescription(parsedBoard.description || '');
      setTasks(parsedBoard.tasks || []);
    }
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const updatedTasks = Array.from(tasks);
  
    const [movedTask] = updatedTasks.splice(source.index, 1);
  
    movedTask.status = destination.droppableId;
    
    updatedTasks.splice(destination.index, 0, movedTask);
  
    setTasks(updatedTasks);
    localStorage.setItem('taskBoard', JSON.stringify({ boardName, description, tasks: updatedTasks }));
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

  const filterTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">{boardName || 'Task Board'}</h1>
      <p className="text-center mb-6">{description}</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {["To-Do", "In Progress", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className={`p-4 rounded-lg shadow-lg ${
                    status === "To-Do"
                      ? "bg-gray-100"
                      : status === "In Progress"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ minHeight: "200px" }}
                >
                  <h2 className="font-semibold text-lg mb-3">
                    {status === "To-Do" ? "To-Do" : status === "In Progress" ? "In Progress" : "Completed"}
                  </h2>

                  {filterTasksByStatus(status).map((task, index) => (
                    <Draggable 
                      key={task.id} 
                      draggableId={task.id} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`p-4 mb-4 bg-white rounded-lg shadow-md ${
                            snapshot.isDragging ? "bg-gray-300" : ""
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {!task.isEditingTask ? (
                            <ViewWork
                              taskTitle={task.taskTitle}
                              status={task.status}
                              assignedTo={task.assignedTo}
                              onEditTask={() => {
                                const newTasks = tasks.map(t =>
                                  t.id === task.id ? { ...t, isEditingTask: true } : t
                                );
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
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
