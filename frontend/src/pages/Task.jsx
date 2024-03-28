import React, { useEffect, useState } from "react";
import "../styles/Task.css";
import userImg from "../assets/user.png";
import emptyTask from "../assets/no-task.png";

import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { getTasks, setApiData } from "../redux/taskSlice";
import axios from "axios";
import { debounce } from "lodash";

const Task = () => {
  const { name, token } = useSelector(
    (state) => state.user.userData || state.user
  );

  const { apiData } = useSelector((state) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortPriority, setSortPriority] = useState(false);
  const [sortCompleted, setSortCompleted] = useState(false);
  const [sortPending, setSortPending] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSaveTask = (taskData) => {
    // You can dispatch an action to save the task data here
    console.log("Task data:", taskData);
  };

  useEffect(() => {
    dispatch(getTasks(token));
  }, [dispatch, token]);

  const fetchTasks = debounce(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/", {
        params: {
          title: searchText,
          sortPriority: sortPriority,
          sortCompleted: sortCompleted,
          sortPending: sortPending,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setApiData(response.data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, 500); // Debounce time

  useEffect(() => {
    fetchTasks();
  }, [searchText, sortPriority, sortCompleted, sortPending, token, fetchTasks]);

  // Filter tasks based on checkbox values
  let filteredTasks = [...apiData];

  if (!sortPriority && !sortCompleted && !sortPending) {
    // When no checkbox is checked, sort by generated ID in descending order
    filteredTasks = filteredTasks.sort((a, b) => b._id.localeCompare(a._id));
  } else {
    // Apply additional filters based on checkbox combinations
    if (sortCompleted && sortPending) {
      // Show both completed and pending tasks, completed tasks first
      filteredTasks = filteredTasks.sort((a, b) => {
        if (a.completed && !b.completed) return -1;
        if (!a.completed && b.completed) return 1;
        return 0;
      });
    } else if (sortPriority) {
      // Sort by priority if only priority checkbox is checked
      filteredTasks = filteredTasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
  }

  // Apply additional filters for completed and pending tasks if other checkboxes are checked
  if (sortCompleted && !sortPending) {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  if (sortPending && !sortCompleted) {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  return (
    <div className="task-container">
      <div className="task-leftChild">
        <div className="task-userSection">
          <div className="task-userImage">
            <img src={userImg} alt="User-Image" />
          </div>
          <span>{name}</span>
        </div>
        <div className="task-searchSection">
          <input
            type="text"
            placeholder="Search Task ..."
            className="task-searchBar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="task-addTaskSection">
          <button className="task-addNewTaskButton" onClick={openModal}>
            Add New Task
          </button>
        </div>
        <div className="task-sortSection">
          <div className="task-sortHeading">
            <span>Sort by </span>
          </div>
          <div className="task-sortByBox">
            <span>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={sortPriority}
                onChange={(e) => setSortPriority(e.target.checked)}
              />{" "}
              Priority
            </span>
            <span>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={sortCompleted}
                onChange={(e) => setSortCompleted(e.target.checked)}
              />{" "}
              Completed
            </span>
            <span>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={sortPending}
                onChange={(e) => setSortPending(e.target.checked)}
              />{" "}
              Pending
            </span>
          </div>
        </div>
      </div>
      <div className="task-rightChild">
        <div className="task-rightChild-cards">
          {filteredTasks.length === 0 ? (
            <div className="task-rightChild-cards-emptycard">
              <img src={emptyTask} />
              <p>No tasks found. Add a task!</p>
            </div>
          ) : (
            filteredTasks.map((item) => <TaskCard key={item._id} data={item} />)
          )}
        </div>
      </div>
      {showModal && <TaskModal onClose={closeModal} onSave={handleSaveTask} />}
    </div>
  );
};

export default Task;
