import { describe, expect, it } from "vitest";
import {
  APP_STORAGE_KEY,
  DEFAULT_PREFERENCES,
  loadAppState,
  saveAppState,
} from "../src/lib/storage.js";

describe("app state storage", () => {
  it("loads default app state when browser storage is empty", () => {
    expect(loadAppState(createMemoryStorage())).toEqual({
      customExercises: [],
      setRecords: [],
      preferences: DEFAULT_PREFERENCES,
    });
  });

  it("saves and loads custom exercises, set records, and preferences", () => {
    const storage = createMemoryStorage();
    const appState = {
      customExercises: [
        {
          id: "custom-farmer-carry",
          name: "Farmer Carry",
          muscleGroup: "Upper Body",
          source: "custom",
        },
      ],
      setRecords: [
        {
          id: "set-1",
          exerciseId: "custom-farmer-carry",
          weightKg: 42,
          reps: 8,
          setNumber: 2,
          date: "2026-06-11",
          createdAt: "2026-06-11T10:00:00.000Z",
          updatedAt: "2026-06-11T10:00:00.000Z",
        },
      ],
      preferences: {
        language: "id",
        weightUnit: "lbs",
      },
    };

    saveAppState(appState, storage);

    expect(loadAppState(storage)).toEqual(appState);
    expect(JSON.parse(storage.getItem(APP_STORAGE_KEY)).setRecords[0].weightKg).toBe(42);
  });

  it("falls back to safe defaults when stored data is invalid", () => {
    const storage = createMemoryStorage();
    storage.setItem(
      APP_STORAGE_KEY,
      JSON.stringify({
        customExercises: "not-an-array",
        setRecords: "not-an-array",
        preferences: {
          language: "fr",
          weightUnit: "stone",
        },
      }),
    );

    expect(loadAppState(storage)).toEqual({
      customExercises: [],
      setRecords: [],
      preferences: DEFAULT_PREFERENCES,
    });
  });
});

function createMemoryStorage() {
  const values = new Map();

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}
