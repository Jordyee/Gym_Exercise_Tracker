import { useState } from "react";
import { MUSCLE_GROUPS } from "../data/defaultExercises.js";
import { createCustomExercise } from "../lib/exercise.js";

const initialFormState = {
  name: "",
  muscleGroup: "",
};

export function AddExerciseForm({ exercises, onAddExercise }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function resetForm() {
    setFormValues(initialFormState);
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = createCustomExercise(formValues, exercises);

    if (!result.exercise) {
      setErrors(result.errors);
      return;
    }

    onAddExercise(result.exercise);
    resetForm();
    setIsOpen(false);
  }

  function handleCancel() {
    resetForm();
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <section className="add-exercise-panel" aria-labelledby="add-exercise-title">
        <div>
          <p className="section-label">Custom exercise</p>
          <h2 id="add-exercise-title">Need a different exercise?</h2>
        </div>
        <button
          className="secondary-action"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Add Exercise
        </button>
      </section>
    );
  }

  return (
    <section className="add-exercise-panel" aria-labelledby="add-exercise-title">
      <form className="add-exercise-form" onSubmit={handleSubmit} noValidate>
        <div className="section-heading">
          <p className="section-label">Custom exercise</p>
          <h2 id="add-exercise-title">Add exercise</h2>
        </div>

        <div className="add-exercise-fields">
          <label className="field">
            <span>Exercise name</span>
            <input
              type="text"
              value={formValues.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Farmer Carry"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "custom-exercise-name-error" : undefined}
            />
            {errors.name ? (
              <span className="field-error" id="custom-exercise-name-error">
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="field">
            <span>Muscle group</span>
            <select
              value={formValues.muscleGroup}
              onChange={(event) =>
                updateField("muscleGroup", event.target.value)
              }
              aria-invalid={errors.muscleGroup ? "true" : "false"}
              aria-describedby={
                errors.muscleGroup ? "custom-exercise-muscle-group-error" : undefined
              }
            >
              <option value="">Choose muscle group</option>
              {MUSCLE_GROUPS.map((muscleGroup) => (
                <option value={muscleGroup} key={muscleGroup}>
                  {muscleGroup}
                </option>
              ))}
            </select>
            {errors.muscleGroup ? (
              <span
                className="field-error"
                id="custom-exercise-muscle-group-error"
              >
                {errors.muscleGroup}
              </span>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-action" type="submit">
            Save Exercise
          </button>
          <button className="ghost-action" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
