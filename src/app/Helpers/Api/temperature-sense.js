const API_DOMAIN = "https://us-central1-earth-sense-3a418.cloudfunctions.net/app/";

const headers = { 
  "Content-Type": "application/json"
};

export const getTemperatureSensorIndex = async (start, end) => {
    try {
      // Construct the URL with query parameters
      const url = new URL(`${API_DOMAIN}api/temperature-sensor/index`);
      if (start) url.searchParams.append("start", start);
      if (end) url.searchParams.append("end", end);
  
      const response = await fetch(url, { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching temperature sensor index:", error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  };