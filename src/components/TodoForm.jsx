import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";

const TodoForm = () => {

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return ["lavender", "sage", "rose", "midnight"].includes(savedTheme)
      ? savedTheme
      : "lavender";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = {
    lavender: {
      page: "bg-[#f8f5ff]",
      card: "bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff]",
      title: "text-[#2b223f]",
      subtitle: "text-[#6b5b8a]",
      item: "bg-white/70 border-purple-100",
      itemText: "text-[#2b223f]",
      input: "bg-white/70 border-purple-200 text-[#2b223f]",
      checkbox: "bg-purple-100 text-purple-600 hover:bg-purple-200",
      addButton: "bg-[#7c3aed] hover:bg-[#6d28d9]",
    },

    sage: {
      page: "bg-[#f4f7f3]",
      card: "bg-gradient-to-br from-[#eef3eb] to-[#dce7d8]",
      title: "text-[#2f4633]",
      subtitle: "text-[#5c735f]",
      item: "bg-white/80 border-[#c9d6c5]",
      itemText: "text-[#2f4633]",
      input: "bg-white/80 border-[#c9d6c5] text-[#2f4633]",
      checkbox: "bg-[#dce7d8] text-[#4f6f52] hover:bg-[#c9d6c5]",
      addButton: "bg-[#6b8f71] hover:bg-[#5c7c62]",
    },

    rose: {
      page: "bg-[#fff1f2]",
      card: "bg-gradient-to-br from-[#ffe4e6] to-[#fecdd3]",
      title: "text-[#881337]",
      subtitle: "text-[#9f1239]",
      item: "bg-white/80 border-pink-200",
      itemText: "text-[#881337]",
      input: "bg-white/80 border-pink-200 text-[#881337]",
      checkbox: "bg-pink-100 text-pink-600 hover:bg-pink-200",
      addButton: "bg-pink-500 hover:bg-pink-600",
    },

    midnight: {
      page: "bg-[#151320]",
      card: "bg-[#1e1b2e] border border-[#312e4a]",
      title: "text-white",
      subtitle: "text-[#a8a3c2]",
      item: "bg-[#2a2740] border-[#3f3b5e]",
      itemText: "text-gray-100",
      input:
        "bg-[#2a2740] border-[#3f3b5e] text-white placeholder:text-gray-400",
      checkbox: "bg-[#3a3658] text-[#b794f4] hover:bg-[#4a4570]",
      addButton: "bg-[#8b5cf6] hover:bg-[#7c3aed]",
    },
  };

  const currentTheme = themes[theme]

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  const inputRef = useRef()

  const AddTask = () => {
    const inputText = inputRef.current.value.trim()
    // console.log(inputText)

    if (!inputText) return

    const newTask = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }

    setTasks((prev) => [...prev, newTask])
    inputRef.current.value = ''
  }

  const deleteTask = (id) => {
    setTasks((prevTask) => {
      return prevTask.filter((tasks) => tasks.id !== id)
    })
  }

  const toggle = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {...task, isComplete: !task.isComplete}
        }
        return task
      })
    })
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  // console.log(theme);
  // console.log(currentTheme);

  return (
    <div className={`min-h-screen py-10 ${currentTheme.page}`}>
      <div
        className={`w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto min-h-50 p-6 rounded-2xl shadow-xl ${currentTheme.card}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${currentTheme.title}`}>
              To-Do List
            </h1>

            <p className={`text-sm mb-6 ${currentTheme.subtitle}`}>
              stay organised. get things done.
            </p>
          </div>

          {/* theme icon */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setTheme("lavender")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                theme === "lavender"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              lavender
            </button>

            <button
              onClick={() => setTheme("sage")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                theme === "sage"
                  ? "bg-[#6b8f71] text-white"
                  : "bg-[#dce7d8] text-[#2f4633]"
              }`}
            >
              sage
            </button>

            <button
              onClick={() => setTheme("rose")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                theme === "rose"
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-pink-700"
              }`}
            >
              rose
            </button>

            <button
              onClick={() => setTheme("midnight")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                theme === "midnight"
                  ? "bg-[#1e1b2e] text-white"
                  : "bg-[#312e4a] text-[#c4b5fd]"
              }`}
            >
              midnight
            </button>
          </div>
        </div>

        {/* new task */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
          <input
            type="text"
            ref={inputRef}
            placeholder="Add a task..."
            className={`w-full flex-1 px-4 py-3 rounded-xl border outline-none transition ${currentTheme.input}`}
          />

          <button
            onClick={AddTask}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-medium active:scale-95 transition cursor-pointer ${currentTheme.addButton}`}
          >
            Add
          </button>
        </div>

        {/* task items */}
        <div className="mt-5">
          <h2 className={`font-semibold text-lg mb-3 ${currentTheme.title}`}>
            Your Tasks
          </h2>

          {tasks.length === 0 && (
            <p className="text-sm text-gray-500 mt-4">
              no tasks yet. add something.
            </p>
          )}

          <div className="overflow-y-auto max-h-60 space-y-3 pr-2 scrollbar-none">
            {tasks.map((items) => {
              return (
                <TodoList
                  key={items.id}
                  text={items.text}
                  id={items.id}
                  isComplete={items.isComplete}
                  deleteTask={deleteTask}
                  toggle={toggle}
                  theme={theme}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
