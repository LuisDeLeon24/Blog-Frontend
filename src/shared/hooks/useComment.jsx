import { useState } from "react";
import {
  PostComment,
  deleteComment as deleteCommentRequest,
  updateComment as updateCommentRequest,
} from "../../services/api";

export const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postComment = async ({ author, content, publication }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await PostComment({ author, content, publication });

      if (response.error) {
        setError(response.msg);
        return null;
      }

      return response;
    } catch (err) {
      setError("Error al enviar el comentario.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const result = await deleteCommentRequest(commentId);

      if (result?.error) {
        setError(result.msg || "No se pudo eliminar el comentario.");
        return false;
      }

      return true;
    } catch (err) {
      setError("Error al eliminar comentario.");
      return false;
    }
  };

  const updateComment = async (commentId, updatedComment) => {
    try {
      const result = await updateCommentRequest(commentId, updatedComment);

      if (result?.error) {
        setError(result.msg || "No se pudo actualizar el comentario.");
        return null;
      }

      return result.comment || result.data?.comment || updatedComment;
    } catch (err) {
      setError("Error al actualizar comentario.");
      return null;
    }
  };

  return {
    postComment,
    deleteComment,
    updateComment,
    loading,
    error,
  };
};

