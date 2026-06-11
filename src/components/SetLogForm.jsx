import { useState } from "react";
import { translateError } from "../data/translations.js";

const initialFormValues = {
  weightKg: "",
  reps: "",
  setNumber: "1",
  date: getTodayDate(),
};

export function SetLogForm({ selectedExercise, onSaveSet, translations }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  function updateField(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setIsSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = onSaveSet({
      ...formValues,
      exerciseId: selectedExercise?.id ?? "",
    });

    if (!result.record) {
      setErrors(result.errors);
      setIsSaved(false);
      return;
    }

    setErrors({});
    setIsSaved(true);
    setFormValues({
      weightKg: "",
      reps: "",
      setNumber: String(Number(formValues.setNumber) + 1),
      date: formValues.date,
    });
  }

  return (
    <section className="set-log-panel" aria-labelledby="set-log-title">
      <form className="set-log-form" onSubmit={handleSubmit} noValidate>
        <div className="section-heading">
          <p className="section-label">{translations.setLog.label}</p>
          <h2 id="set-log-title">
            {selectedExercise
              ? translations.setLog.recordTitle(selectedExercise.name)
              : translations.setLog.chooseFirst}
          </h2>
        </div>

        {errors.exerciseId ? (
          <p className="form-error" role="alert">
            {translateError(errors.exerciseId, translations)}
          </p>
        ) : null}

        <div className="set-log-fields">
          <label className="field">
            <span>{translations.setLog.weight}</span>
            <input
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={formValues.weightKg}
              onChange={(event) => updateField("weightKg", event.target.value)}
              placeholder="20"
              aria-invalid={errors.weightKg ? "true" : "false"}
              aria-describedby={errors.weightKg ? "set-weight-error" : undefined}
            />
            {errors.weightKg ? (
              <span className="field-error" id="set-weight-error">
                {translateError(errors.weightKg, translations)}
              </span>
            ) : null}
          </label>

          <label className="field">
            <span>{translations.setLog.reps}</span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={formValues.reps}
              onChange={(event) => updateField("reps", event.target.value)}
              placeholder="10"
              aria-invalid={errors.reps ? "true" : "false"}
              aria-describedby={errors.reps ? "set-reps-error" : undefined}
            />
            {errors.reps ? (
              <span className="field-error" id="set-reps-error">
                {translateError(errors.reps, translations)}
              </span>
            ) : null}
          </label>

          <label className="field">
            <span>{translations.setLog.setNumber}</span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={formValues.setNumber}
              onChange={(event) => updateField("setNumber", event.target.value)}
              placeholder="1"
              aria-invalid={errors.setNumber ? "true" : "false"}
              aria-describedby={
                errors.setNumber ? "set-number-error" : undefined
              }
            />
            {errors.setNumber ? (
              <span className="field-error" id="set-number-error">
                {translateError(errors.setNumber, translations)}
              </span>
            ) : null}
          </label>

          <label className="field">
            <span>{translations.setLog.date}</span>
            <input
              type="date"
              value={formValues.date}
              onChange={(event) => updateField("date", event.target.value)}
              aria-invalid={errors.date ? "true" : "false"}
              aria-describedby={errors.date ? "set-date-error" : undefined}
            />
            {errors.date ? (
              <span className="field-error" id="set-date-error">
                {translateError(errors.date, translations)}
              </span>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-action" type="submit">
            {translations.setLog.save}
          </button>
          {isSaved ? (
            <p className="form-status" role="status">
              {translations.setLog.saved}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
