import { MUSCLE_GROUPS } from "../data/defaultExercises.js";

export function filterExercises(exercises, filters = {}) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const muscleGroup = filters.muscleGroup ?? "All";

  return exercises.filter((exercise) =>
    (!query || exercise.name.toLowerCase().includes(query)) &&
    (muscleGroup === "All" || exercise.muscleGroup === muscleGroup),
  );
}

export function validateCustomExerciseInput(input = {}) {
  const name = input.name?.trim() ?? "";
  const muscleGroup = input.muscleGroup ?? "";
  const errors = {};

  if (!name) {
    errors.name = "Exercise name is required.";
  }

  if (!muscleGroup) {
    errors.muscleGroup = "Choose a muscle group.";
  } else if (!MUSCLE_GROUPS.includes(muscleGroup)) {
    errors.muscleGroup = "Choose a valid muscle group.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createCustomExercise(input = {}, existingExercises = []) {
  const validation = validateCustomExerciseInput(input);

  if (!validation.isValid) {
    return {
      exercise: null,
      errors: validation.errors,
    };
  }

  const name = input.name.trim();
  const idBase = `custom-${slugifyExerciseName(name) || "exercise"}`;
  const existingIds = new Set(
    existingExercises.map((exercise) => exercise.id),
  );
  let id = idBase;
  let suffix = 2;

  while (existingIds.has(id)) {
    id = `${idBase}-${suffix}`;
    suffix += 1;
  }

  return {
    exercise: {
      id,
      name,
      muscleGroup: input.muscleGroup,
      source: "custom",
    },
    errors: {},
  };
}

function slugifyExerciseName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
