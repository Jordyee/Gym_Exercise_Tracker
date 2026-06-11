import { describe, expect, it } from "vitest";
import { DEFAULT_EXERCISES, MUSCLE_GROUPS } from "../src/data/defaultExercises.js";
import {
  createCustomExercise,
  filterExercises,
  validateCustomExerciseInput,
} from "../src/lib/exercise.js";

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

describe("custom exercise helpers", () => {
  it("requires an exercise name and muscle group", () => {
    const validation = validateCustomExerciseInput({
      name: "   ",
      muscleGroup: "",
    });

    expect(validation).toEqual({
      isValid: false,
      errors: {
        name: "Exercise name is required.",
        muscleGroup: "Choose a muscle group.",
      },
    });
  });

  it("rejects a muscle group outside the supported catalog groups", () => {
    const validation = validateCustomExerciseInput({
      name: "Farmer Carry",
      muscleGroup: "Conditioning",
    });

    expect(validation).toEqual({
      isValid: false,
      errors: {
        muscleGroup: "Choose a valid muscle group.",
      },
    });
  });

  it("creates a valid custom exercise with a stable unique id", () => {
    const result = createCustomExercise(
      {
        name: "  Farmer Carry  ",
        muscleGroup: "Upper Body",
      },
      DEFAULT_EXERCISES,
    );

    expect(result).toEqual({
      exercise: {
        id: "custom-farmer-carry",
        name: "Farmer Carry",
        muscleGroup: "Upper Body",
        source: "custom",
      },
      errors: {},
    });
  });

  it("keeps duplicate custom exercise ids unique", () => {
    const result = createCustomExercise(
      {
        name: "Bench Press",
        muscleGroup: "Chest",
      },
      [
        ...DEFAULT_EXERCISES,
        {
          id: "custom-bench-press",
          name: "Bench Press",
          muscleGroup: "Chest",
          source: "custom",
        },
      ],
    );

    expect(result.exercise.id).toBe("custom-bench-press-2");
  });

  it("keeps custom exercises searchable and filterable", () => {
    const result = createCustomExercise(
      {
        name: "Farmer Carry",
        muscleGroup: "Upper Body",
      },
      DEFAULT_EXERCISES,
    );
    const exercises = [...DEFAULT_EXERCISES, result.exercise];

    const filteredExercises = filterExercises(exercises, {
      query: "farmer",
      muscleGroup: "Upper Body",
    });

    expect(filteredExercises).toEqual([result.exercise]);
  });
});
