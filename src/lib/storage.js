export const APP_STORAGE_KEY = "gym-exercise-tracker:app-state";

export const DEFAULT_PREFERENCES = {
  language: "en",
  weightUnit: "kg",
};

export function createDefaultAppState() {
  return {
    customExercises: [],
    setRecords: [],
    preferences: { ...DEFAULT_PREFERENCES },
  };
}

export function loadAppState(storage = getBrowserStorage()) {
  if (!storage) {
    return createDefaultAppState();
  }

  try {
    const storedState = storage.getItem(APP_STORAGE_KEY);

    if (!storedState) {
      return createDefaultAppState();
    }

    const parsedState = JSON.parse(storedState);

    return {
      customExercises: Array.isArray(parsedState?.customExercises)
        ? parsedState.customExercises
        : [],
      setRecords: Array.isArray(parsedState?.setRecords)
        ? parsedState.setRecords
        : [],
      preferences: normalizePreferences(parsedState?.preferences),
    };
  } catch {
    return createDefaultAppState();
  }
}

export function saveAppState(state = {}, storage = getBrowserStorage()) {
  if (!storage) {
    return;
  }

  const stateToSave = {
    customExercises: Array.isArray(state.customExercises)
      ? state.customExercises
      : [],
    setRecords: Array.isArray(state.setRecords) ? state.setRecords : [],
    preferences: normalizePreferences(state.preferences),
  };

  try {
    storage.setItem(APP_STORAGE_KEY, JSON.stringify(stateToSave));
  } catch {
    // localStorage can be unavailable or full; app state still works in memory.
  }
}

export function normalizePreferences(preferences = {}) {
  return {
    language: preferences.language === "id" ? "id" : DEFAULT_PREFERENCES.language,
    weightUnit:
      preferences.weightUnit === "lbs"
        ? "lbs"
        : DEFAULT_PREFERENCES.weightUnit,
  };
}

function getBrowserStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}
