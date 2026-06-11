import { useState } from "react";
import { DEFAULT_EXERCISES } from "./data/defaultExercises.js";
import { AddExerciseForm } from "./components/AddExerciseForm.jsx";
import { ExercisePicker } from "./components/ExercisePicker.jsx";
import { HistoryView } from "./components/HistoryView.jsx";
import { RecentRecords } from "./components/RecentRecords.jsx";
import { SetLogForm } from "./components/SetLogForm.jsx";
import { createSetRecord, getRecentRecords } from "./lib/records.js";

export default function App() {
  const [customExercises, setCustomExercises] = useState([]);
  const [setRecords, setSetRecords] = useState([]);
  const [activeView, setActiveView] = useState("log");
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
          <p className="eyebrow">Issue 5</p>
          <h1>Gym Exercise Tracker</h1>
        </div>
        <p className="scope-label">Log sets and history</p>
      </header>

      <nav className="view-tabs" aria-label="Main views">
        <button
          type="button"
          className="tab-button"
          data-active={activeView === "log"}
          aria-pressed={activeView === "log"}
          onClick={() => setActiveView("log")}
        >
          Log Set
        </button>
        <button
          type="button"
          className="tab-button"
          data-active={activeView === "history"}
          aria-pressed={activeView === "history"}
          onClick={() => setActiveView("history")}
        >
          History
        </button>
      </nav>

      {activeView === "log" ? (
        <>
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

          <AddExerciseForm
            exercises={exercises}
            onAddExercise={handleAddExercise}
          />

          <ExercisePicker
            exercises={exercises}
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={setSelectedExerciseId}
          />
        </>
      ) : (
        <HistoryView records={setRecords} selectedExercise={selectedExercise} />
      )}
    </main>
  );
}
