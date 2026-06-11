import { useEffect, useState } from "react";
import { DEFAULT_EXERCISES } from "./data/defaultExercises.js";
import {
  getMuscleGroupLabel,
  getTranslations,
} from "./data/translations.js";
import { AddExerciseForm } from "./components/AddExerciseForm.jsx";
import { AppHeader } from "./components/AppHeader.jsx";
import { ConfirmDialog } from "./components/ConfirmDialog.jsx";
import { EditSetModal } from "./components/EditSetModal.jsx";
import { ExercisePicker } from "./components/ExercisePicker.jsx";
import { HistoryView } from "./components/HistoryView.jsx";
import { RecentRecords } from "./components/RecentRecords.jsx";
import { SetLogForm } from "./components/SetLogForm.jsx";
import { loadAppState, saveAppState } from "./lib/storage.js";
import { formatWeight } from "./lib/units.js";
import {
  createSetRecord,
  deleteSetRecord,
  getRecentRecords,
  updateSetRecord,
} from "./lib/records.js";

export default function App() {
  const [initialAppState] = useState(() => loadAppState());
  const [customExercises, setCustomExercises] = useState(
    initialAppState.customExercises,
  );
  const [setRecords, setSetRecords] = useState(initialAppState.setRecords);
  const [preferences, setPreferences] = useState(
    initialAppState.preferences,
  );
  const [activeView, setActiveView] = useState("log");
  const [editingRecord, setEditingRecord] = useState(null);
  const [recordPendingDelete, setRecordPendingDelete] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    DEFAULT_EXERCISES[0]?.id ?? "",
  );
  const exercises = [...DEFAULT_EXERCISES, ...customExercises];
  const translations = getTranslations(preferences.language);
  const weightUnit = preferences.weightUnit;

  const selectedExercise = exercises.find(
    (exercise) => exercise.id === selectedExerciseId,
  );
  const recentRecords = getRecentRecords(setRecords, selectedExerciseId);

  useEffect(() => {
    saveAppState({
      customExercises,
      setRecords,
      preferences,
    });
  }, [customExercises, setRecords, preferences]);

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

  function handleChangeLanguage(language) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      language,
    }));
  }

  function handleChangeWeightUnit(weightUnitValue) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      weightUnit: weightUnitValue,
    }));
  }

  return (
    <main className="app-shell">
      <AppHeader
        preferences={preferences}
        translations={translations}
        onChangeLanguage={handleChangeLanguage}
        onChangeWeightUnit={handleChangeWeightUnit}
      />

      <nav className="view-tabs" aria-label={translations.tabs.label}>
        <button
          type="button"
          className="tab-button"
          data-active={activeView === "log"}
          aria-pressed={activeView === "log"}
          onClick={() => setActiveView("log")}
        >
          {translations.tabs.log}
        </button>
        <button
          type="button"
          className="tab-button"
          data-active={activeView === "history"}
          aria-pressed={activeView === "history"}
          onClick={() => setActiveView("history")}
        >
          {translations.tabs.history}
        </button>
      </nav>

      {activeView === "log" ? (
        <>
          <section className="selected-panel" aria-live="polite">
            <p className="section-label">{translations.selected.label}</p>
            {selectedExercise ? (
              <>
                <h2>{selectedExercise.name}</h2>
                <p>
                  {getMuscleGroupLabel(
                    selectedExercise.muscleGroup,
                    translations,
                  )}
                </p>
              </>
            ) : (
              <p>{translations.selected.empty}</p>
            )}
          </section>

          <SetLogForm
            selectedExercise={selectedExercise}
            translations={translations}
            onSaveSet={handleSaveSet}
          />

          <RecentRecords
            records={recentRecords}
            selectedExercise={selectedExercise}
            translations={translations}
            weightUnit={weightUnit}
          />

          <AddExerciseForm
            exercises={exercises}
            translations={translations}
            onAddExercise={handleAddExercise}
          />

          <ExercisePicker
            exercises={exercises}
            selectedExerciseId={selectedExerciseId}
            translations={translations}
            onSelectExercise={setSelectedExerciseId}
          />
        </>
      ) : (
        <HistoryView
          records={setRecords}
          selectedExercise={selectedExercise}
          translations={translations}
          weightUnit={weightUnit}
          onEditRecord={setEditingRecord}
          onRequestDelete={setRecordPendingDelete}
        />
      )}

      {editingRecord ? (
        <EditSetModal
          key={editingRecord.id}
          record={editingRecord}
          exercises={exercises}
          translations={translations}
          onSave={handleUpdateSet}
          onCancel={() => setEditingRecord(null)}
        />
      ) : null}

      {recordPendingDelete ? (
        <ConfirmDialog
          title={translations.confirmDelete.title}
          message={translations.confirmDelete.message(
            recordPendingDelete,
            formatWeight(recordPendingDelete.weightKg, weightUnit),
          )}
          confirmLabel={translations.confirmDelete.confirm}
          cancelLabel={translations.confirmDelete.cancel}
          onConfirm={handleConfirmDelete}
          onCancel={() => setRecordPendingDelete(null)}
        />
      ) : null}
    </main>
  );
}
