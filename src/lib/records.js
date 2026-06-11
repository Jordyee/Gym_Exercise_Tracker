export function validateSetInput(input = {}) {
  const errors = {};

  if (!input.exerciseId) {
    errors.exerciseId = "Choose an exercise before saving a set.";
  }

  if (!isNonNegativeInteger(input.weightKg)) {
    errors.weightKg = "Weight must be a whole number in kg.";
  }

  if (!isPositiveInteger(input.reps)) {
    errors.reps = "Reps must be a positive whole number.";
  }

  if (!isPositiveInteger(input.setNumber)) {
    errors.setNumber = "Set number must be a positive whole number.";
  }

  if (!String(input.date ?? "").trim()) {
    errors.date = "Date is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createSetRecord(input = {}, now = new Date().toISOString()) {
  const validation = validateSetInput(input);

  if (!validation.isValid) {
    return {
      record: null,
      errors: validation.errors,
    };
  }

  return {
    record: {
      id: `set-${createTimestampId(now)}`,
      exerciseId: input.exerciseId,
      weightKg: Number(input.weightKg),
      reps: Number(input.reps),
      setNumber: Number(input.setNumber),
      date: input.date,
      createdAt: now,
      updatedAt: now,
    },
    errors: {},
  };
}

export function getRecentRecords(records = [], exerciseId, limit = 3) {
  if (!exerciseId) {
    return [];
  }

  return records
    .filter((record) => record.exerciseId === exerciseId)
    .sort(compareNewestRecords)
    .slice(0, limit);
}

export function filterRecordsByPeriod(records = [], period = "all", today = getTodayDate()) {
  if (period === "all") {
    return [...records];
  }

  const days = period === "7-days" ? 7 : period === "30-days" ? 30 : null;

  if (!days) {
    return [...records];
  }

  const endDate = normalizeDate(today);
  const startDate = addDays(endDate, -(days - 1));

  return records.filter(
    (record) => record.date >= startDate && record.date <= endDate,
  );
}

export function getHistoryRecords(records = [], exerciseId, period = "all", today = getTodayDate()) {
  if (!exerciseId) {
    return [];
  }

  return filterRecordsByPeriod(
    records.filter((record) => record.exerciseId === exerciseId),
    period,
    today,
  ).sort(compareNewestRecords);
}

export function getHistorySummary(records = []) {
  return {
    highestWeightKg:
      records.length > 0
        ? Math.max(...records.map((record) => Number(record.weightKg)))
        : null,
    totalSets: records.length,
  };
}

function isNonNegativeInteger(value) {
  const normalizedValue = String(value ?? "").trim();

  if (normalizedValue === "") {
    return false;
  }

  const numberValue = Number(normalizedValue);

  return Number.isInteger(numberValue) && numberValue >= 0;
}

function isPositiveInteger(value) {
  const normalizedValue = String(value ?? "").trim();

  if (normalizedValue === "") {
    return false;
  }

  const numberValue = Number(normalizedValue);

  return Number.isInteger(numberValue) && numberValue > 0;
}

function createTimestampId(timestamp) {
  return timestamp.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+$/g, "");
}

function compareNewestRecords(firstRecord, secondRecord) {
  const dateComparison = secondRecord.date.localeCompare(firstRecord.date);

  if (dateComparison !== 0) {
    return dateComparison;
  }

  return secondRecord.createdAt.localeCompare(firstRecord.createdAt);
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizeDate(date) {
  return String(date).slice(0, 10);
}

function addDays(date, amount) {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  parsedDate.setUTCDate(parsedDate.getUTCDate() + amount);

  return parsedDate.toISOString().slice(0, 10);
}
