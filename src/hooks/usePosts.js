import { useState, useEffect } from "react";
import apiService from "../services/api/bridge";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const newPost = await apiService.createPost(postData);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePost = async (id) => {
    try {
      await apiService.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    createPost,
    deletePost,
  };
}
