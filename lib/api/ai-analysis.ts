const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAiTeamResults = async () => {
  const res = await fetch(`${API_BASE_URL}/ai-analysis/user-summaries`);
  if (!res.ok) {
    throw new Error("Failed to fetch AI team results");
  }
  return res.json();
};
