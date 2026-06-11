import { useState } from "react";

export function EditSetModal({ record, exercises, onSave, onCancel }) {
  const [formValues, setFormValues] = useState({
    exerciseId: record.exerciseId,
    weightKg: String(record.weightKg),
    reps: String(record.reps),
    setNumber: String(record.setNumber),
    date: record.date,
  });
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
      record: undefined,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = onSave(record.id, formValues);

    if (!result.record) {
      setErrors(result.errors);
    }
  }

  return (
    <div className="modal-backdrop">
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-set-title"
      >
        <form className="edit-set-form" onSubmit={handleSubmit} noValidate>
          <div className="section-heading">
            <p className="section-label">Edit record</p>
            <h2 id="edit-set-title">Update set details</h2>
          </div>

          {errors.record ? (
            <p className="form-error" role="alert">
              {errors.record}
            </p>
          ) : null}

          <div className="edit-set-fields">
            <label className="field">
              <span>Exercise</span>
              <select
                value={formValues.exerciseId}
                onChange={(event) => updateField("exerciseId", event.target.value)}
                aria-invalid={errors.exerciseId ? "true" : "false"}
                aria-describedby={
                  errors.exerciseId ? "edit-exercise-error" : undefined
                }
              >
                <option value="">Choose exercise</option>
                {exercises.map((exercise) => (
                  <option value={exercise.id} key={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
              {errors.exerciseId ? (
                <span className="field-error" id="edit-exercise-error">
                  {errors.exerciseId}
                </span>
              ) : null}
            </label>

            <label className="field">
              <span>Weight (kg)</span>
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={formValues.weightKg}
                onChange={(event) => updateField("weightKg", event.target.value)}
                aria-invalid={errors.weightKg ? "true" : "false"}
                aria-describedby={
                  errors.weightKg ? "edit-weight-error" : undefined
                }
              />
              {errors.weightKg ? (
                <span className="field-error" id="edit-weight-error">
                  {errors.weightKg}
                </span>
              ) : null}
            </label>

            <label className="field">
              <span>Reps</span>
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={formValues.reps}
                onChange={(event) => updateField("reps", event.target.value)}
                aria-invalid={errors.reps ? "true" : "false"}
                aria-describedby={errors.reps ? "edit-reps-error" : undefined}
              />
              {errors.reps ? (
                <span className="field-error" id="edit-reps-error">
                  {errors.reps}
                </span>
              ) : null}
            </label>

            <label className="field">
              <span>Set number</span>
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={formValues.setNumber}
                onChange={(event) => updateField("setNumber", event.target.value)}
                aria-invalid={errors.setNumber ? "true" : "false"}
                aria-describedby={
                  errors.setNumber ? "edit-set-number-error" : undefined
                }
              />
              {errors.setNumber ? (
                <span className="field-error" id="edit-set-number-error">
                  {errors.setNumber}
                </span>
              ) : null}
            </label>

            <label className="field">
              <span>Date</span>
              <input
                type="date"
                value={formValues.date}
                onChange={(event) => updateField("date", event.target.value)}
                aria-invalid={errors.date ? "true" : "false"}
                aria-describedby={errors.date ? "edit-date-error" : undefined}
              />
              {errors.date ? (
                <span className="field-error" id="edit-date-error">
                  {errors.date}
                </span>
              ) : null}
            </label>
          </div>

          <div className="modal-actions">
            <button className="primary-action" type="submit">
              Save Changes
            </button>
            <button className="ghost-action" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
