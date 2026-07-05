function Spinner({ label = "Cargando...", size = "md", inline = false }) {
    const sizeClass = {
        sm: "spinner-sm",
        md: "spinner-md",
        lg: "spinner-lg"
    }[size] || "spinner-md";

    return (
        <div className={`loader ${inline ? "loader-inline" : ""}`} role="status" aria-live="polite" aria-label={label}>
            <span className={`spinner ${sizeClass}`}></span>
            {label && <span className="loader-text">{label}</span>}
        </div>
    );
}

export default Spinner;
