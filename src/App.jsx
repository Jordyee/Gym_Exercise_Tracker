import { useState } from "react";
import { DEFAULT_EXERCISES } from "./data/defaultExercises.js";
import { AddExerciseForm } from "./components/AddExerciseForm.jsx";
import { ExercisePicker } from "./components/ExercisePicker.jsx";
import { RecentRecords } from "./components/RecentRecords.jsx";
import { SetLogForm } from "./components/SetLogForm.jsx";
import { createSetRecord, getRecentRecords } from "./lib/records.js";

export default function App() {
  const [customExercises, setCustomExercises] = useState([]);
  const [setRecords, setSetRecords] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    DEFAULT_EXERCISES[0]?.id ?? "",
  );
  const exercises = [...DEFAULT_EXERCISES, ...customExercises];

  const selectedExercise = exercises.find(
    (exercise) => exercise.id === selectedExerciseId,
  );
  const recentRecords = getRecentRecords(setRecords, selectedExerciseId);

  function handleAddExercise(exercise) {
    setCustomExercises((currentExercises) => [...currentExercises, exercise]);
    setSelectedExerciseId(exercise.id);
  }

  function handleSaveSet(input) {
    const result = createSetRecord(input);

    if (!result.record) {
      return result;
    }

    setSetRecords((currentRecords) => [...currentRecords, result.record]);

    return result;
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Issue 4</p>
          <h1>Gym Exercise Tracker</h1>
        </div>
        <p className="scope-label">Log sets</p>
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

      <SetLogForm
        selectedExercise={selectedExercise}
        onSaveSet={handleSaveSet}
      />

      <RecentRecords
        records={recentRecords}
        selectedExercise={selectedExercise}
      />

      <AddExerciseForm exercises={exercises} onAddExercise={handleAddExercise} />

      <ExercisePicker
        exercises={exercises}
        selectedExerciseId={selectedExerciseId}
        onSelectExercise={setSelectedExerciseId}
      />
    </main>
  );
}
