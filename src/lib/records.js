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
