import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import strawberryBtn from "../assets/strawberry_btn.png";
import ribbonImg from "../assets/ribbon_icon.png"


const TodoForm = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return ["lavender", "sage", "rose", "midnight"].includes(savedTheme)
      ? savedTheme
      : "lavender";
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const themes = {
    lavender: {
      page: "bg-[#f8f5ff]",
      title: "text-[#2b223f]",
      subtitle: "text-[#6b5b8a]",
      input: "bg-white border-purple-200 text-[#2b223f]",
      button: "bg-[#7c3aed] hover:bg-[#6d28d9]",
      item: "bg-white border-purple-100",
      text: "text-[#2b223f]",
      muted: "text-gray-500",
      checkbox: "bg-purple-100 text-purple-600 hover:bg-purple-200",
    },

    sage: {
      page: "bg-[#f4f7f3]",
      title: "text-[#2f4633]",
      subtitle: "text-[#5c735f]",
      input: "bg-white border-[#c9d6c5] text-[#2f4633]",
      button: "bg-[#6b8f71] hover:bg-[#5c7c62]",
      item: "bg-white border-[#c9d6c5]",
      text: "text-[#2f4633]",
      muted: "text-gray-500",
      checkbox: "bg-[#dce7d8] text-[#4f6f52] hover:bg-[#c9d6c5]",
    },

    rose: {
      page: "bg-[#fff1f2]",
      title: "text-[#881337]",
      subtitle: "text-[#9f1239]",
      input: "bg-white border-pink-200 text-[#881337]",
      button: "bg-pink-500 hover:bg-pink-600",
      item: "bg-white border-pink-100",
      text: "text-[#881337]",
      muted: "text-gray-500",
      checkbox: "bg-pink-100 text-pink-600 hover:bg-pink-200",
    },

    midnight: {
      page: "bg-[#151320]",
      title: "text-white",
      subtitle: "text-[#a8a3c2]",
      input: "bg-[#2a2740] border-[#3f3b5e] text-white",
      button: "bg-[#8b5cf6] hover:bg-[#7c3aed]",
      item: "bg-[#2a2740] border-[#3f3b5e]",
      text: "text-gray-100",
      muted: "text-gray-400",
      checkbox: "bg-[#3a3658] text-[#b794f4] hover:bg-[#4a4570]",
    },
  };

  const current = themes[theme];

  const AddTask = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;

    setTasks((prev) => [...prev, { id: Date.now(), text, isComplete: false }]);

    inputRef.current.value = "";
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isComplete: !t.isComplete } : t)),
    );
  };

  return (
    <div className={`min-h-screen ${current.page}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <h1
              className={`text-5xl font-bold tracking-tight flex items-center gap-3 ${current.title}`}
            >
              <img
                src={ribbonImg}
                alt=""
                className="w-10 h-10"
                style={{ imageRendering: "pixelated" }}
              />
              tasks
            </h1>

            <p className={`text-sm mt-3 ${current.subtitle}`}>
              organise your work and clear your mind.
            </p>
          </div>

          {/* theme switch */}
          <div className="flex gap-2 flex-wrap">
            {Object.keys(themes).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-2 rounded-full text-sm transition ${
                  theme === t
                    ? `${current.button} text-white`
                    : `${current.input}`
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* input */}
        <div
          className={`mt-8 max-w-3xl flex items-center border transition-all duration-300 ${current.item}`}
        >
          <input
            ref={inputRef}
            placeholder="what needs your attention today?"
            className={`flex-1 bg-transparent px-5 py-4 outline-none text-sm sm:text-base ${current.text}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddTask();
              }
            }}
          />

          <button
            onClick={AddTask}
            className="shrink-0 transition active:translate-y-px"
          >
            <img
              src={strawberryBtn}
              alt="add task"
              className="w-10 h-10"
              style={{ imageRendering: "pixelated" }}
            />
          </button>
        </div>

        {/* tasks */}
        <div className="max-w-3xl">
          <div className="mt-10 mb-5">
            <h2 className={`text-lg font-semibold ${current.title}`}>tasks</h2>

            <p
              className={`text-sm flex items-center gap-2 ${current.subtitle}`}
            >
              🍓 {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          <div className="space-y-3">
            {tasks.map((t) => (
              <TodoList
                key={t.id}
                task={t}
                toggle={toggle}
                deleteTask={deleteTask}
                styles={current}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
