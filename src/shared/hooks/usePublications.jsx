import { useState, useEffect } from "react"; 
import toast from "react-hot-toast";
import { getPost } from "../../services/api";
import { useComment } from "../hooks/useComment"; 
import { useToast } from "@chakra-ui/react"; 

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


