import { useState } from "react";
import { DEFAULT_EXERCISES } from "./data/defaultExercises.js";
import { ExercisePicker } from "./components/ExercisePicker.jsx";

export default function App() {
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    DEFAULT_EXERCISES[0]?.id ?? "",
  );

  const selectedExercise = DEFAULT_EXERCISES.find(
    (exercise) => exercise.id === selectedExerciseId,
  );

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Issue 1</p>
          <h1>Gym Exercise Tracker</h1>
        </div>
        <p className="scope-label">Exercise catalog</p>
      </header>

      <section className="selected-panel" aria-live="polite">
        <p className="section-label">Selected exercise</p>
        {selectedExercise ? (
          <>
            <h2>{selectedExercise.name}</h2>
            <p>{selectedExercise.muscleGroup}</p>
          </>
        ) : (
          <p>No exercise selected.</p>
        )}
      </section>

      <ExercisePicker
        exercises={DEFAULT_EXERCISES}
        selectedExerciseId={selectedExerciseId}
        onSelectExercise={setSelectedExerciseId}
      />
    </main>
  );
}
