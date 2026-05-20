export function successResponse(data) {
  return { success: true, data };
}

export function errorResponse(error) {
  return { success: false, error: String(error) };
}
