import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPost } from "../../services/api";

export const usePublications = () => {
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
        return;
      }

      if (data.publications && Array.isArray(data.publications)) {
        setPublications(data.publications);
      } else {
        toast.error("Datos de publicaciones inválidos");
        setError("Datos inválidos");
      }
    } catch (err) {
      toast.error("Error desconocido al obtener publicaciones");
      setError(err.message || "Error desconocido");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  return {
    publications,
    isFetching,
    error,
    fetchPublications,
  };
};





