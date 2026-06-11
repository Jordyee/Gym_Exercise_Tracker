import { describe, expect, it } from "vitest";
import { DEFAULT_EXERCISES, MUSCLE_GROUPS } from "../src/data/defaultExercises.js";
import { filterExercises } from "../src/lib/exercise.js";

describe("default exercise catalog", () => {
  it("includes at least two exercises for every supported muscle group", () => {
    for (const muscleGroup of MUSCLE_GROUPS) {
      const exercises = DEFAULT_EXERCISES.filter(
        (exercise) => exercise.muscleGroup === muscleGroup,
      );

      expect(exercises.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("uses stable unique ids and valid muscle groups", () => {
    const ids = new Set(DEFAULT_EXERCISES.map((exercise) => exercise.id));

    expect(ids.size).toBe(DEFAULT_EXERCISES.length);

    for (const exercise of DEFAULT_EXERCISES) {
      expect(exercise.id).toMatch(/^[a-z0-9-]+$/);
      expect(exercise.name.trim()).toBe(exercise.name);
      expect(exercise.name.length).toBeGreaterThan(0);
      expect(MUSCLE_GROUPS).toContain(exercise.muscleGroup);
      expect(exercise.source).toBe("default");
    }
  });
});

describe("exercise filtering", () => {
  it("filters exercises by name query", () => {
    const exercises = filterExercises(DEFAULT_EXERCISES, {
      query: "press",
      muscleGroup: "All",
    });

    expect(exercises.map((exercise) => exercise.id)).toEqual([
      "bench-press",
      "chest-press-machine",
      "shoulder-press",
      "leg-press",
    ]);
  });

  it("filters exercises by muscle group", () => {
    const exercises = filterExercises(DEFAULT_EXERCISES, {
      query: "",
      muscleGroup: "Back",
    });

    expect(exercises.map((exercise) => exercise.id)).toEqual([
      "lat-pulldown",
      "seated-cable-row",
    ]);
  });

  it("combines name query and muscle group filters", () => {
    const exercises = filterExercises(DEFAULT_EXERCISES, {
      query: "press",
      muscleGroup: "Chest",
    });

    expect(exercises.map((exercise) => exercise.id)).toEqual([
      "bench-press",
      "chest-press-machine",
    ]);
  });

  it("returns an empty list when no exercises match", () => {
    const exercises = filterExercises(DEFAULT_EXERCISES, {
      query: "deadlift",
      muscleGroup: "Chest",
    });

    expect(exercises).toEqual([]);
  });
});
