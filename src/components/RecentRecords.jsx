export function RecentRecords({ records, selectedExercise }) {
  return (
    <section className="recent-records-panel" aria-labelledby="recent-records-title">
      <div className="section-heading">
        <p className="section-label">Last 3 records</p>
        <h2 id="recent-records-title">
          {selectedExercise ? selectedExercise.name : "No exercise selected"}
        </h2>
      </div>

      {records.length > 0 ? (
        <ol className="recent-records-list" aria-live="polite">
          {records.map((record) => (
            <li className="recent-record" key={record.id}>
              <span>{record.date}</span>
              <strong>{record.weightKg} kg</strong>
              <span>{record.reps} reps</span>
              <span>Set {record.setNumber}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty-state recent-empty" role="status">
          <p>No set records for this exercise yet.</p>
        </div>
      )}
    </section>
  );
}
