import { useState, useEffect } from "react";
import apiService from "../services/api/bridge";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMyPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const newPost = await apiService.savePost(postData);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePost = async (postId, postData) => {
    try {
      const updatedPost = await apiService.updatePost(postId, postData);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post)),
      );
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePost = async (postId) => {
    try {
      await apiService.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    fetchMyPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
