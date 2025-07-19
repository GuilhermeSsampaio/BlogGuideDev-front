import { useState, useEffect } from "react";
import apiService from "../services/api/bridge";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [postAuthor, setPostAuthor] = useState("");
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

  const getPost = async (idPost) => {
    try {
      const post = await apiService.getPost(idPost);
      setPost(post);
      return post;
    } catch (err) {
      setError(err.message);
      throw error;
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

  //terminar de implementar
  const updatePost = async (idPost) => {
    try {
      const postForUpdate = await apiService.getPost(idPost);
      console.log(postForUpdate);
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

  const getPostAuthor = async (postId) => {
    try {
      const postAuthor = await apiService.getUSerOfPost(postId);
      setPostAuthor(postAuthor);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    posts,
    post,
    postAuthor,
    loading,
    error,
    refetch: fetchPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    getPostAuthor,
  };
}
