import { useMemo, useState } from "react";
import { getHistoryRecords, getHistorySummary } from "../lib/records.js";
import { formatWeight } from "../lib/units.js";

const PERIOD_OPTIONS = [
  { value: "7-days" },
  { value: "30-days" },
  { value: "all" },
];

export function HistoryView({
  records,
  selectedExercise,
  translations,
  weightUnit,
  onEditRecord,
  onRequestDelete,
}) {
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
        <p className="section-label">{translations.history.label}</p>
        <h2 id="history-title">
          {selectedExercise ? selectedExercise.name : translations.history.emptyTitle}
        </h2>
      </div>

      <div className="period-filters" aria-label={translations.history.periodLabel}>
        {PERIOD_OPTIONS.map((option) => (
          <button
            type="button"
            className="period-button"
            data-active={activePeriod === option.value}
            aria-pressed={activePeriod === option.value}
            key={option.value}
            onClick={() => setActivePeriod(option.value)}
          >
            {translations.history.periods[option.value]}
          </button>
        ))}
      </div>

      <div className="history-summary" aria-live="polite">
        <article>
          <span>{translations.history.highestWeight}</span>
          <strong>
            {summary.highestWeightKg === null
              ? translations.history.noData
              : formatWeight(summary.highestWeightKg, weightUnit)}
          </strong>
        </article>
        <article>
          <span>{translations.history.totalSets}</span>
          <strong>{summary.totalSets}</strong>
        </article>
      </div>

      {!selectedExercise ? (
        <div className="empty-state history-empty" role="status">
          <p>{translations.history.chooseExercise}</p>
        </div>
      ) : historyRecords.length > 0 ? (
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th scope="col">{translations.history.date}</th>
                <th scope="col">{translations.history.weight}</th>
                <th scope="col">{translations.history.reps}</th>
                <th scope="col">{translations.history.set}</th>
                <th scope="col">{translations.history.actions}</th>
              </tr>
            </thead>
            <tbody>
              {historyRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{formatWeight(record.weightKg, weightUnit)}</td>
                  <td>{record.reps}</td>
                  <td>{record.setNumber}</td>
                  <td>
                    <div className="record-actions">
                      <button
                        className="compact-action"
                        type="button"
                        onClick={() => onEditRecord(record)}
                      >
                        {translations.history.edit}
                      </button>
                      <button
                        className="compact-danger-action"
                        type="button"
                        onClick={() => onRequestDelete(record)}
                      >
                        {translations.history.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state history-empty" role="status">
          <p>{translations.history.noRecords}</p>
        </div>
      )}
    </section>
  );
}
