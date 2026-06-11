import { describe, expect, it } from "vitest";
import {
  createSetRecord,
  filterRecordsByPeriod,
  getHistoryRecords,
  getHistorySummary,
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

describe("history period filters", () => {
  it("returns records from today through the previous six days for the 7 day period", () => {
    const records = [
      createRecord("today", "bench-press", "2026-06-11", "2026-06-11T08:00:00.000Z"),
      createRecord("six-days-ago", "bench-press", "2026-06-05", "2026-06-05T08:00:00.000Z"),
      createRecord("seven-days-ago", "bench-press", "2026-06-04", "2026-06-04T08:00:00.000Z"),
      createRecord("future", "bench-press", "2026-06-12", "2026-06-12T08:00:00.000Z"),
    ];

    const filteredRecords = filterRecordsByPeriod(records, "7-days", "2026-06-11");

    expect(filteredRecords.map((record) => record.id)).toEqual([
      "today",
      "six-days-ago",
    ]);
  });

  it("returns records from today through the previous twenty nine days for the 30 day period", () => {
    const records = [
      createRecord("today", "bench-press", "2026-06-11", "2026-06-11T08:00:00.000Z"),
      createRecord("twenty-nine-days-ago", "bench-press", "2026-05-13", "2026-05-13T08:00:00.000Z"),
      createRecord("thirty-days-ago", "bench-press", "2026-05-12", "2026-05-12T08:00:00.000Z"),
    ];

    const filteredRecords = filterRecordsByPeriod(records, "30-days", "2026-06-11");

    expect(filteredRecords.map((record) => record.id)).toEqual([
      "today",
      "twenty-nine-days-ago",
    ]);
  });

  it("returns every record for the all period", () => {
    const records = [
      createRecord("old", "bench-press", "2026-01-01", "2026-01-01T08:00:00.000Z"),
      createRecord("new", "bench-press", "2026-06-11", "2026-06-11T08:00:00.000Z"),
    ];

    const filteredRecords = filterRecordsByPeriod(records, "all", "2026-06-11");

    expect(filteredRecords.map((record) => record.id)).toEqual(["old", "new"]);
  });
});

describe("exercise history records", () => {
  it("returns only the selected exercise records in the active period newest first", () => {
    const records = [
      createRecord("bench-old", "bench-press", "2026-06-04", "2026-06-04T08:00:00.000Z"),
      createRecord("bench-latest", "bench-press", "2026-06-11", "2026-06-11T08:00:00.000Z"),
      createRecord("squat-latest", "squat", "2026-06-11", "2026-06-11T08:30:00.000Z"),
      createRecord("bench-second", "bench-press", "2026-06-10", "2026-06-10T08:00:00.000Z"),
    ];

    const historyRecords = getHistoryRecords(
      records,
      "bench-press",
      "7-days",
      "2026-06-11",
    );

    expect(historyRecords.map((record) => record.id)).toEqual([
      "bench-latest",
      "bench-second",
    ]);
  });
});

describe("history summary", () => {
  it("counts total sets and highest weight from the active filtered records", () => {
    const records = [
      createRecord("warmup", "bench-press", "2026-06-11", "2026-06-11T08:00:00.000Z", 0),
      createRecord("working-set", "bench-press", "2026-06-11", "2026-06-11T08:05:00.000Z", 40),
      createRecord("backoff", "bench-press", "2026-06-11", "2026-06-11T08:10:00.000Z", 35),
    ];

    expect(getHistorySummary(records)).toEqual({
      highestWeightKg: 40,
      totalSets: 3,
    });
  });

  it("returns an empty summary when there are no records in the active filter", () => {
    expect(getHistorySummary([])).toEqual({
      highestWeightKg: null,
      totalSets: 0,
    });
  });
});

function createRecord(id, exerciseId, date, createdAt, weightKg = 20) {
  return {
    id,
    exerciseId,
    weightKg,
    reps: 10,
    setNumber: 1,
    date,
    createdAt,
    updatedAt: createdAt,
  };
}
