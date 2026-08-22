import css from "./Diary.module.css";

const clampPercent = (value) => Math.min(100, Math.max(0, value));

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB").replace(/\//g, ".");
};

const Diary = ({ entries, totalPages, onDeleteEntry }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className={css.empty}>
        <div className={css.emptyIcon} aria-hidden="true">✨</div>
        <p className={css.emptyText}>
          Here you will see when and how much you read. To record, click on
          the red button above.
        </p>
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <p className={css.heading}>Diary</p>

      <ul className={css.list}>
        {[...entries].reverse().map((entry) => {
          const startPage = Number(entry.startPage) || 0;
          const finishPage = Number(entry.finishPage) || startPage;
          const pagesRead = Math.max(0, finishPage - startPage);

          const percent = totalPages
            ? clampPercent(Math.round((finishPage / totalPages) * 1000) / 10)
            : 0;

          let durationMinutes = null;
          if (entry.startDate && entry.finishDate) {
            const ms =
              new Date(entry.finishDate).getTime() -
              new Date(entry.startDate).getTime();
            if (ms > 0) durationMinutes = Math.round(ms / 60000);
          }

          const speed =
            durationMinutes && durationMinutes >= 1
              ? Math.round(pagesRead / (durationMinutes / 60))
              : null;

          return (
            <li key={entry._id} className={css.entry}>
              <button
                type="button"
                className={css.deleteBtn}
                onClick={() => onDeleteEntry(entry._id)}
                aria-label="Delete entry"
              >
                🗑
              </button>

              <div className={css.entryTop}>
                <span className={css.checkbox} aria-hidden="true" />
                <span className={css.entryDate}>
                  {formatDate(entry.finishDate || entry.date)}
                </span>
                <span className={css.entryPages}>{pagesRead} pages</span>
              </div>

              <div className={css.entryBottom}>
                <div className={css.entryLeft}>
                  <span className={css.entryPercent}>{percent}%</span>
                  {durationMinutes !== null && (
                    <span className={css.entryDuration}>
                      {durationMinutes} minutes
                    </span>
                  )}
                </div>

                <div className={css.entryRight}>
                  <div className={css.progressBar}>
                    <div
                      className={css.progressFill}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className={css.entrySpeed}>
                    {speed !== null ? `${speed} pages per hour` : "—"}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Diary;