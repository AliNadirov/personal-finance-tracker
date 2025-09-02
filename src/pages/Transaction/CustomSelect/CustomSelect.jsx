import { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

export default function CustomSelect({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (event) => {
        if (!open) return;

        if (event.key === "ArrowDown") {
            setHighlighted((prev) => (prev + 1) % options.length);
            event.preventDefault();
        } else if (event.key === "ArrowUp") {
            setHighlighted((prev) => (prev - 1 + options.length) % options.length);
            event.preventDefault();
        } else if (event.key === "Enter") {
            onChange(options[highlighted]);
            setOpen(false);
            event.preventDefault();
        } else if (event.key === "Escape") {
            setOpen(false);
            event.preventDefault();
        }
    };

    return (
        <div
            className="custom-select"
            ref={ref}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className="select-box" onClick={() => setOpen((prev) => !prev)}>
                {value || "Select..."}
                <span className={`arrow ${open ? "open" : ""}`}></span>
            </div>
            {open && (
                <div className="options">
                    {options.map((opt, index) => (
                        <div
                            key={opt}
                            className={`option ${index === highlighted ? "highlighted" : ""}`}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            onMouseEnter={() => setHighlighted(index)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}