import { MUSCLE_GROUPS } from "../data/defaultExercises.js";

export function ExercisePicker({
  exercises,
  selectedExerciseId,
  onSelectExercise,
}) {
  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-heading">
        <p className="section-label">Default catalog</p>
        <h2 id="catalog-title">Choose an exercise</h2>
      </div>

      <div className="muscle-groups">
        {MUSCLE_GROUPS.map((muscleGroup) => {
          const groupExercises = exercises.filter(
            (exercise) => exercise.muscleGroup === muscleGroup,
          );

          return (
            <article className="muscle-group" key={muscleGroup}>
              <h3>{muscleGroup}</h3>
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
                      <small>{exercise.muscleGroup}</small>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
