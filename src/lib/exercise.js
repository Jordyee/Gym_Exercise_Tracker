export function filterExercises(exercises, filters = {}) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const muscleGroup = filters.muscleGroup ?? "All";

  return exercises.filter((exercise) =>
    (!query || exercise.name.toLowerCase().includes(query)) &&
    (muscleGroup === "All" || exercise.muscleGroup === muscleGroup),
  );
}
