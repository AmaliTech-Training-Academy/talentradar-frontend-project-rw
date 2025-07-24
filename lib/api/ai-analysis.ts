const API_BASE_URL = process.env.NEXT_PUBLIC_AI_SCORE_API_URL;

export const fetchAiTeamResults = async () => {
  const res = await fetch(`${API_BASE_URL}`, {
    credentials: "include", 
    headers: {
        "Content-Type": "Application/json"
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch AI team results");
  }
  return res.json();
};
