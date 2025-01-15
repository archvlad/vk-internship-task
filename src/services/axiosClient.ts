import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjYyN2YxOGFlOWEyN2FmMjFiMGRjNWE1MDU2ZmY3YyIsIm5iZiI6MTczNjg2OTUzNy4zMzEsInN1YiI6IjY3ODY4NmExMTM2ZTE1N2NmMjdiOWNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nUj6F7rYg3OZLDcyLagugwekGQemsfXXg-ICOyAO1RY",
  },
});

export default axiosClient;
