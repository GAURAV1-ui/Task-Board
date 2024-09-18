import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddWork from "../../components/AddWork";
import EditWork from "../../components/EditWork";

const initialData = {
  todo: [
    { id: "task-1", title: "Hello", description: "Complete ButtonShift Assignment", assignedTo: "@iamsb", status:"To-Do" },
    { id: "task-2", title: "Hello1", description: "Complete ButtonShift Assignment!!", assignedTo: "@iamsbssd", status:"To-Do" },
  ],
  inProgress: [
    { id: "task-3", title: "Hell02", description: "Complete ButtonShift Assignment11", assignedTo: "@iamsba", status:"In Progress" },
  ],
  completed: [
    { id: "task-4", title: "Hello3", description: "Complete ButtonShift Assignment222", assignedTo: "@iamsbhkdgh", status:"Done" },
  ],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialData);

  const onDragEnd = (result) => {

    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destinationColumn = tasks[destination.droppableId];
  

    const sourceTasks = Array.from(sourceColumn);
    const destinationTasks = Array.from(destinationColumn);

    const [removedTask] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    });
  };

  console.log(tasks);

  const handleSubmitTask = (taskTitle, taskDescription, assignedTo, status) => {
    console.log({ taskTitle, taskDescription, assignedTo, status });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Task Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {Object.keys(tasks).map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  className={`p-4 rounded-lg shadow-lg ${
                    columnId === "todo"
                      ? "bg-gray-100"
                      : columnId === "inProgress"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ minHeight: "200px" }}
                >
                  <h2 className="font-semibold text-lg mb-3">
                    {columnId === "todo"
                      ? "To-Do"
                      : columnId === "inProgress"
                      ? "In Progress"
                      : "Completed"}
                  </h2>

                  {tasks[columnId].map((task, index) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          
                          <div 
                            className={`p-4 mb-4 bg-white rounded-lg shadow-md ${
                              snapshot.isDragging ? "bg-gray-300" : ""
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                          <EditWork
                            onTaskSubmit={(taskTitle,taskDescription,assignedTo,status) =>
                            handleSubmitTask(taskTitle, taskDescription, assignedTo, status)}
                            title={task.title}
                            description={task.description}
                            assignedTo={task.assignedTo}
                            status={task.status} />
                          </div>  
                        )}
                      </Draggable>
                    );
                  })}
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