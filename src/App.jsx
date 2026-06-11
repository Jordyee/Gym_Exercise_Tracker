import { useState } from "react";
import { DEFAULT_EXERCISES } from "./data/defaultExercises.js";
import { AddExerciseForm } from "./components/AddExerciseForm.jsx";
import { ConfirmDialog } from "./components/ConfirmDialog.jsx";
import { EditSetModal } from "./components/EditSetModal.jsx";
import { ExercisePicker } from "./components/ExercisePicker.jsx";
import { HistoryView } from "./components/HistoryView.jsx";
import { RecentRecords } from "./components/RecentRecords.jsx";
import { SetLogForm } from "./components/SetLogForm.jsx";
import {
  createSetRecord,
  deleteSetRecord,
  getRecentRecords,
  updateSetRecord,
} from "./lib/records.js";

export default function App() {
  const [customExercises, setCustomExercises] = useState([]);
  const [setRecords, setSetRecords] = useState([]);
  const [activeView, setActiveView] = useState("log");
  const [editingRecord, setEditingRecord] = useState(null);
  const [recordPendingDelete, setRecordPendingDelete] = useState(null);
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

  function handleUpdateSet(recordId, input) {
    const result = updateSetRecord(setRecords, recordId, input);

    if (!result.record) {
      return result;
    }

    setSetRecords(result.records);
    setSelectedExerciseId(result.record.exerciseId);
    setEditingRecord(null);

    return result;
  }

  function handleConfirmDelete() {
    if (!recordPendingDelete) {
      return;
    }

    setSetRecords((currentRecords) =>
      deleteSetRecord(currentRecords, recordPendingDelete.id),
    );
    setRecordPendingDelete(null);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Issue 6</p>
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
        <HistoryView
          records={setRecords}
          selectedExercise={selectedExercise}
          onEditRecord={setEditingRecord}
          onRequestDelete={setRecordPendingDelete}
        />
      )}

      {editingRecord ? (
        <EditSetModal
          key={editingRecord.id}
          record={editingRecord}
          exercises={exercises}
          onSave={handleUpdateSet}
          onCancel={() => setEditingRecord(null)}
        />
      ) : null}

      {recordPendingDelete ? (
        <ConfirmDialog
          title="Delete set record?"
          message={`${recordPendingDelete.date} | ${recordPendingDelete.weightKg} kg | ${recordPendingDelete.reps} reps | Set ${recordPendingDelete.setNumber}`}
          confirmLabel="Delete Record"
          cancelLabel="Keep Record"
          onConfirm={handleConfirmDelete}
          onCancel={() => setRecordPendingDelete(null)}
        />
      ) : null}
    </main>
  );
}
