import { useState } from "react";
import { MUSCLE_GROUPS } from "../data/defaultExercises.js";
import {
  getMuscleGroupLabel,
  translateError,
} from "../data/translations.js";
import { createCustomExercise } from "../lib/exercise.js";

const initialFormState = {
  name: "",
  muscleGroup: "",
};

export function AddExerciseForm({ exercises, onAddExercise, translations }) {
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
          <p className="section-label">{translations.addExercise.label}</p>
          <h2 id="add-exercise-title">{translations.addExercise.closedTitle}</h2>
        </div>
        <button
          className="secondary-action"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          {translations.addExercise.addButton}
        </button>
      </section>
    );
  }

  return (
    <section className="add-exercise-panel" aria-labelledby="add-exercise-title">
      <form className="add-exercise-form" onSubmit={handleSubmit} noValidate>
        <div className="section-heading">
          <p className="section-label">{translations.addExercise.label}</p>
          <h2 id="add-exercise-title">{translations.addExercise.openTitle}</h2>
        </div>

        <div className="add-exercise-fields">
          <label className="field">
            <span>{translations.addExercise.name}</span>
            <input
              type="text"
              value={formValues.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={translations.addExercise.namePlaceholder}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "custom-exercise-name-error" : undefined}
            />
            {errors.name ? (
              <span className="field-error" id="custom-exercise-name-error">
                {translateError(errors.name, translations)}
              </span>
            ) : null}
          </label>

          <label className="field">
            <span>{translations.addExercise.muscleGroup}</span>
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
              <option value="">{translations.addExercise.chooseMuscleGroup}</option>
              {MUSCLE_GROUPS.map((muscleGroup) => (
                <option value={muscleGroup} key={muscleGroup}>
                  {getMuscleGroupLabel(muscleGroup, translations)}
                </option>
              ))}
            </select>
            {errors.muscleGroup ? (
              <span
                className="field-error"
                id="custom-exercise-muscle-group-error"
              >
                {translateError(errors.muscleGroup, translations)}
              </span>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-action" type="submit">
            {translations.addExercise.save}
          </button>
          <button className="ghost-action" type="button" onClick={handleCancel}>
            {translations.addExercise.cancel}
          </button>
        </div>
      </form>
    </section>
  );
}
