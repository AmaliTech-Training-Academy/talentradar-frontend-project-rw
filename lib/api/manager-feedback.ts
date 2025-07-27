const baseUrl= process.env.NEXT_PUBLIC_API_BASE_URL 
export const fetchDevelopers= async ()=>{
      const response = await fetch(`${baseUrl}/user-assign/developers`,{
        method: "GET",
        credentials: 'include',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        });
      const data = await response.json();
      return data.data;
    }