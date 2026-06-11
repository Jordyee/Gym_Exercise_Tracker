import { describe, expect, it } from "vitest";
import {
  createSetRecord,
  getRecentRecords,
  validateSetInput,
} from "../src/lib/records.js";

describe("set record validation", () => {
  it("accepts zero weight with positive integer reps, set number, and a date", () => {
    const validation = validateSetInput({
      exerciseId: "bench-press",
      weightKg: "0",
      reps: "10",
      setNumber: "1",
      date: "2026-06-11",
    });

    expect(validation).toEqual({
      isValid: true,
      errors: {},
    });
  });

  it("rejects missing exercise, non-integer weight, non-positive reps, non-integer set number, and blank date", () => {
    const validation = validateSetInput({
      exerciseId: "",
      weightKg: "12.5",
      reps: "0",
      setNumber: "2.5",
      date: "   ",
    });

    expect(validation).toEqual({
      isValid: false,
      errors: {
        exerciseId: "Choose an exercise before saving a set.",
        weightKg: "Weight must be a whole number in kg.",
        reps: "Reps must be a positive whole number.",
        setNumber: "Set number must be a positive whole number.",
        date: "Date is required.",
      },
    });
  });
});

describe("set record creation", () => {
  it("stores weight, reps, and set number as integers with required dates", () => {
    const result = createSetRecord(
      {
        exerciseId: "bench-press",
        weightKg: "0",
        reps: "10",
        setNumber: "1",
        date: "2026-06-11",
      },
      "2026-06-11T10:15:00.000Z",
    );

    expect(result).toEqual({
      record: {
        id: "set-2026-06-11T10-15-00-000Z",
        exerciseId: "bench-press",
        weightKg: 0,
        reps: 10,
        setNumber: 1,
        date: "2026-06-11",
        createdAt: "2026-06-11T10:15:00.000Z",
        updatedAt: "2026-06-11T10:15:00.000Z",
      },
      errors: {},
    });
  });
});

describe("recent set records", () => {
  it("returns only the latest three records for the active exercise", () => {
    const records = [
      createRecord("bench-oldest", "bench-press", "2026-06-08", "2026-06-08T08:00:00.000Z"),
      createRecord("bench-third", "bench-press", "2026-06-10", "2026-06-10T08:00:00.000Z"),
      createRecord("squat-latest", "squat", "2026-06-12", "2026-06-12T08:00:00.000Z"),
      createRecord("bench-latest", "bench-press", "2026-06-11", "2026-06-11T08:00:00.000Z"),
      createRecord("bench-second", "bench-press", "2026-06-10", "2026-06-10T09:00:00.000Z"),
    ];

    const recentRecords = getRecentRecords(records, "bench-press");

    expect(recentRecords.map((record) => record.id)).toEqual([
      "bench-latest",
      "bench-second",
      "bench-third",
    ]);
  });
});

function createRecord(id, exerciseId, date, createdAt) {
  return {
    id,
    exerciseId,
    weightKg: 20,
    reps: 10,
    setNumber: 1,
    date,
    createdAt,
    updatedAt: createdAt,
  };
}
