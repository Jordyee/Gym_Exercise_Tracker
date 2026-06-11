import { formatWeight } from "../lib/units.js";

export function RecentRecords({ records, selectedExercise, translations, weightUnit }) {
  return (
    <section className="recent-records-panel" aria-labelledby="recent-records-title">
      <div className="section-heading">
        <p className="section-label">{translations.recent.label}</p>
        <h2 id="recent-records-title">
          {selectedExercise ? selectedExercise.name : translations.recent.emptyTitle}
        </h2>
      </div>

      {records.length > 0 ? (
        <ol className="recent-records-list" aria-live="polite">
          {records.map((record) => (
            <li className="recent-record" key={record.id}>
              <span>{record.date}</span>
              <strong>{formatWeight(record.weightKg, weightUnit)}</strong>
              <span>{translations.recent.reps(record.reps)}</span>
              <span>{translations.recent.set(record.setNumber)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty-state recent-empty" role="status">
          <p>{translations.recent.empty}</p>
        </div>
      )}
    </section>
  );
}
