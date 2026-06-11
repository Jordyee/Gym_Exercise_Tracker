import { describe, expect, it } from "vitest";
import { DEFAULT_EXERCISES, MUSCLE_GROUPS } from "../src/data/defaultExercises.js";

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
