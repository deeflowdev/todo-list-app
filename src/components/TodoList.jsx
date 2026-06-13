import {
  RiCheckFill,
  RiDeleteBinLine,
  RiCheckboxBlankCircleLine, 
} from "@remixicon/react";

const TodoList = ({ task, toggle, deleteTask, styles }) => {
  return (
    <div
      className={`w-full max-w-3xl flex items-start justify-between p-4 border transition-all duration-200 ${styles.item}`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={() => toggle(task.id)}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${styles.checkbox}`}
        >
          {task.isComplete ? (
            <RiCheckFill size={18} />
          ) : (
            <RiCheckboxBlankCircleLine size={18} />
          )}
        </button>

        <p
          className={`flex-1 wrap-break-word text-[15px] leading-relaxed ${
            task.isComplete ? "line-through text-gray-400" : styles.text
          }`}
        >
          {task.text}
        </p>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="ml-3 shrink-0 text-gray-400 hover:text-red-500 transition"
      >
        <RiDeleteBinLine size={18} />
      </button>
    </div>
  );
};

export default TodoList;
