import { useEffect, useRef, useState } from "react";
import css from "./StatusSelect.module.css";

const OPTIONS = [
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "all", label: "All books" },
];

const StatusSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel =
    OPTIONS.find((opt) => opt.value === value)?.label || "All books";

  const handleSelect = (optValue) => {
    onChange(optValue);
    setOpen(false);
  };

  return (
    <div className={css.wrapper} ref={ref}>
      <button
        type="button"
        className={css.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentLabel}
        <span className={`${css.chevron} ${open ? css.chevronOpen : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul className={css.list}>
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`${css.option} ${
                  opt.value === value ? css.optionActive : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusSelect;
