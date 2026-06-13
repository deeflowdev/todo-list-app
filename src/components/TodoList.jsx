import {
  RiCheckFill,
  RiDeleteBinLine,
  RiCheckboxBlankCircleLine,
} from "@remixicon/react";

const TodoList = ({ text, id, isComplete, deleteTask, toggle, theme }) => {
  const completedStyles = {
    lavender: "bg-[#8b5cf6] text-white",
    rose: "bg-pink-500 text-white",
    midnight: "bg-[#a78bfa] text-white",
    sage: "bg-[#6b8f71] text-white",
  };

  return (
    <div
      className={`w-11/12 max-w-xl mx-auto flex items-start space-x-3 justify-between p-4 rounded-xl border shadow-sm mt-5 ${
        theme === "midnight"
          ? "bg-[#2a2740] border-[#3f3b5e]"
          : theme === "rose"
            ? "bg-white/80 border-pink-200"
            : theme === "sage"
              ? "bg-white/80 border-[#c9d6c5]"
              : "bg-white/70 border-purple-100"
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={() => toggle(id)}
          className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
            isComplete
              ? `${completedStyles[theme]} scale-105`
              : theme === "midnight"
                ? "bg-[#3a3658] text-[#b794f4] hover:bg-[#4a4570]"
                : theme === "rose"
                  ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                  : theme === "sage"
                    ? "bg-[#dce7d8] text-[#4f6f52] hover:bg-[#c9d6c5]"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-200"
          }`}
        >
          {isComplete ? (
            <RiCheckFill size={18} />
          ) : (
            <RiCheckboxBlankCircleLine size={18} />
          )}
        </button>

        <p
          className={`flex-1 font-medium wrap-break-word ${
            isComplete
              ? theme === "sage"
                ? "line-through text-[#7a8f7d] decoration-[#7a8f7d]"
                : "line-through text-gray-500 decoration-gray-500"
              : theme === "midnight"
                ? "text-gray-100"
                : theme === "rose"
                  ? "text-[#881337]"
                  : theme === "sage"
                    ? "text-[#2f4633]"
                    : "text-[#2b223f]"
          }`}
        >
          {text}
        </p>
      </div>

      <button
        className={`transition cursor-pointer shrink-0 ${
          theme === "midnight"
            ? "text-gray-500 hover:text-red-400"
            : theme === "rose"
              ? "text-pink-400 hover:text-red-500"
              : theme === "sage"
                ? "text-[#6b8f71] hover:text-red-500"
                : "text-gray-400 hover:text-red-500"
        }`}
        onClick={() => deleteTask(id)}
      >
        <RiDeleteBinLine size={20} />
      </button>
    </div>
  );
};

export default TodoList;
