import { useMemo, useState } from "react";
import { MUSCLE_GROUPS } from "../data/defaultExercises.js";
import { getMuscleGroupLabel } from "../data/translations.js";
import { filterExercises } from "../lib/exercise.js";

export function ExercisePicker({
  exercises,
  selectedExerciseId,
  translations,
  onSelectExercise,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("All");
  const filteredExercises = useMemo(
    () =>
      filterExercises(exercises, {
        query: searchQuery,
        muscleGroup: selectedMuscleGroup,
      }),
    [exercises, searchQuery, selectedMuscleGroup],
  );
  const hasResults = filteredExercises.length > 0;

  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-heading">
        <p className="section-label">{translations.catalog.label}</p>
        <h2 id="catalog-title">{translations.catalog.title}</h2>
      </div>

      <div className="exercise-filters">
        <label className="field">
          <span>{translations.catalog.search}</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={translations.catalog.searchPlaceholder}
          />
        </label>

        <label className="field">
          <span>{translations.catalog.muscleGroupFilter}</span>
          <select
            value={selectedMuscleGroup}
            onChange={(event) => setSelectedMuscleGroup(event.target.value)}
          >
            <option value="All">{translations.catalog.allMuscleGroups}</option>
            {MUSCLE_GROUPS.map((muscleGroup) => (
              <option value={muscleGroup} key={muscleGroup}>
                {getMuscleGroupLabel(muscleGroup, translations)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {hasResults ? (
        <div className="muscle-groups">
          {MUSCLE_GROUPS.map((muscleGroup) => {
            const groupExercises = filteredExercises.filter(
              (exercise) => exercise.muscleGroup === muscleGroup,
            );

            if (groupExercises.length === 0) {
              return null;
            }

            return (
              <article className="muscle-group" key={muscleGroup}>
                <h3>{getMuscleGroupLabel(muscleGroup, translations)}</h3>
                <div className="exercise-list">
                  {groupExercises.map((exercise) => {
                    const isSelected = exercise.id === selectedExerciseId;

                    return (
                      <button
                        className="exercise-button"
                        type="button"
                        aria-pressed={isSelected}
                        data-selected={isSelected}
                        key={exercise.id}
                        onClick={() => onSelectExercise(exercise.id)}
                      >
                        <span>{exercise.name}</span>
                        <small>
                          {getMuscleGroupLabel(
                            exercise.muscleGroup,
                            translations,
                          )}
                          {exercise.source === "custom"
                            ? ` - ${translations.catalog.custom}`
                            : ""}
                        </small>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <p>{translations.catalog.empty}</p>
        </div>
      )}
    </section>
  );
}
