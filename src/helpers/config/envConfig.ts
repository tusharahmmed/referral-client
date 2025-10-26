export const getBaseUrl = (): string => {
  // return process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";
  return process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";
};
export const getDomain = (): string => {
  return process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
};
