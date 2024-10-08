export function verifyRequiredFields(data, requiredFields) {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!data.hasOwnProperty(field) || data[field] === null || data[field] === '') {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return {
      success: false,
      missingFields: missingFields,
      message: `Missing required fields: ${missingFields.join(', ')}`,
    }
  }

  return true
}
