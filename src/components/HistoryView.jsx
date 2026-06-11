import { useMemo, useState } from "react";
import { getHistoryRecords, getHistorySummary } from "../lib/records.js";

const PERIOD_OPTIONS = [
  { value: "7-days", label: "7 days" },
  { value: "30-days", label: "30 days" },
  { value: "all", label: "All" },
];

export function HistoryView({ records, selectedExercise }) {
  const [activePeriod, setActivePeriod] = useState("7-days");
  const historyRecords = useMemo(
    () =>
      getHistoryRecords(
        records,
        selectedExercise?.id ?? "",
        activePeriod,
      ),
    [records, selectedExercise?.id, activePeriod],
  );
  const summary = useMemo(
    () => getHistorySummary(historyRecords),
    [historyRecords],
  );

  return (
    <section className="history-panel" aria-labelledby="history-title">
      <div className="section-heading">
        <p className="section-label">Exercise history</p>
        <h2 id="history-title">
          {selectedExercise ? selectedExercise.name : "No exercise selected"}
        </h2>
      </div>

      <div className="period-filters" aria-label="History period">
        {PERIOD_OPTIONS.map((option) => (
          <button
            type="button"
            className="period-button"
            data-active={activePeriod === option.value}
            aria-pressed={activePeriod === option.value}
            key={option.value}
            onClick={() => setActivePeriod(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="history-summary" aria-live="polite">
        <article>
          <span>Highest weight</span>
          <strong>
            {summary.highestWeightKg === null
              ? "No data"
              : `${summary.highestWeightKg} kg`}
          </strong>
        </article>
        <article>
          <span>Total sets</span>
          <strong>{summary.totalSets}</strong>
        </article>
      </div>

      {!selectedExercise ? (
        <div className="empty-state history-empty" role="status">
          <p>Choose an exercise on Log Set to view history.</p>
        </div>
      ) : historyRecords.length > 0 ? (
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Weight</th>
                <th scope="col">Reps</th>
                <th scope="col">Set</th>
              </tr>
            </thead>
            <tbody>
              {historyRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.weightKg} kg</td>
                  <td>{record.reps}</td>
                  <td>{record.setNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state history-empty" role="status">
          <p>No history records match this filter.</p>
        </div>
      )}
    </section>
  );
}
