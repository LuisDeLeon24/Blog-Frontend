import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3010/Blog/v1',
    timeout: 5000
})




export const getPost = async () => {
    try {
        const response = await apiClient.get("/publications/getPublications/");
        return response.data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const PostComment = async (data) => {
  try {
    const response = await apiClient.post('/comments/postComments/', data);
    return response.data;
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error al publicar comentario';
    return {
      error: true,
      msg,
      e,
    };
  }
};

export const deleteComment = async (commentId) => {
  try {
       return await apiClient.delete(`/comments/${commentId}`)
 } catch (e) {
     const msg = e.response?.data?.msg || 'Error desconocido';
     return {
         error: true,
         msg,
         e,
     };
 }
}

export const updateComment = async ( commentId,data ) => {
 try{
   return await apiClient.put(`/comments/${commentId}`,data)
 }catch(e){
   const msg = e.response?.data?.msg || 'Error desconocido';
   return {
       error: true,
       msg,
       e,
   };  
 }
}
