import { useState, useEffect } from "react"; // Import useEffect
import toast from "react-hot-toast";
import { getPost } from "../../services/api"; // ajusta ruta si es necesario

export const usePublications = () => { // Define el hook custom como función
  const [publications, setPublications] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublications = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const data = await getPost();

      if (data.error) {
        toast.error(data.msg || "Error al obtener publicaciones");
        setError(data.msg);
        setIsFetching(false);
        return;
      }

      if (data.publications && Array.isArray(data.publications)) {
        setPublications(data.publications);
        setIsFetching(false);
      } else {
        toast.error("Datos de publicaciones inválidos");
        setError("Datos inválidos");
        setIsFetching(false);
      }
    } catch (err) {
      setIsFetching(false);
      toast.error("Error desconocido al obtener publicaciones");
      setError(err.message || "Error desconocido");
    }
  };

  // Optional: fetch publications al montar el componente que usa este hook
  useEffect(() => {
    fetchPublications();
  }, []); // solo se ejecuta una vez al montar

  return {
    publications,
    isFetching,
    error,
    fetchPublications,
  };
};


