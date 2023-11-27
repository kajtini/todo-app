export const PER_PAGE = 5;

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_API_URL;
