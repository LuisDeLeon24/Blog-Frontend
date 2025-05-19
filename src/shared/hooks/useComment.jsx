import { useState } from "react";
import { PostComment } from "../../services/api"; 

export const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postComment = async ({ author, content, publication, createdAt }) => {
    setLoading(true);
    setError(null);

    const response = await PostComment({ author, content, publication, createdAt });

    if (response.error) {
      setError(response.msg);
      setLoading(false);
      return null;
    }

    setLoading(false);
    return response; 
  };

  return {
    postComment,
    loading,
    error,
  };
};
