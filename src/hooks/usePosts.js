import { useState } from "react";
import apiService from "../services/api/bridge";
import { normalizePost, normalizePosts } from "../utils/postUtils";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublishedPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPublishedPosts();
      const normalizedPosts = normalizePosts(data);
      setPosts(normalizedPosts);
      return normalizedPosts;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchPostById = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPostById(postId);
      const normalizedPost = normalizePost(data);
      setPost(normalizedPost);
      return normalizedPost;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMyPosts();
      const normalizedPosts = normalizePosts(data);
      setPosts(normalizedPosts);
      return normalizedPosts;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar posts:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const newPost = normalizePost(await apiService.savePost(postData));
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePost = async (postId, postData) => {
    try {
      const updatedPost = normalizePost(
        await apiService.updatePost(postId, postData),
      );
      setPosts((prevPosts) =>
        prevPosts.map((currentPost) =>
          currentPost.id === postId ? updatedPost : currentPost,
        ),
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
      setPosts((prevPosts) => prevPosts.filter((currentPost) => currentPost.id !== postId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    posts,
    post,
    loading,
    error,
    fetchPublishedPosts,
    fetchPostById,
    fetchMyPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
