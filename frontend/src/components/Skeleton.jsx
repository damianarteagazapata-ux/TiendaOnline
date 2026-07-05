function Skeleton({ type = "card", count = 3 }) {
    if (type === "table") {
        return (
            <div className="skeleton-table" aria-hidden="true">
                <div className="skeleton-row skeleton-row--head" />
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="skeleton-row" />
                ))}
            </div>
        );
    }

    return (
        <div className="skeleton-grid" aria-hidden="true">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-block skeleton-block--image" />
                    <div className="skeleton-block skeleton-block--title" />
                    <div className="skeleton-block skeleton-block--text" />
                    <div className="skeleton-block skeleton-block--text short" />
                </div>
            ))}
        </div>
    );
}

export default Skeleton;
