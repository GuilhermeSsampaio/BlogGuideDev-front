import { useState } from "react";
import apiService from "../services/api/bridge";

export function useForum() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getForumTopics();
      setTopics(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopic = async (topicId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getForumTopic(topicId);
      setTopic(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async (topicData) => {
    const newTopic = await apiService.createForumTopic(topicData);
    setTopics((prev) => [newTopic, ...prev]);
    return newTopic;
  };

  const deleteTopic = async (topicId) => {
    await apiService.deleteForumTopic(topicId);
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
  };

  const updateTopic = async (topicId, topicData) => {
    const updatedTopic = await apiService.updateForumTopic(topicId, topicData);
    setTopics((prev) =>
      prev.map((t) => (t.id === topicId ? updatedTopic : t))
    );
    if (topic && topic.id === topicId) {
      setTopic(updatedTopic);
    }
    return updatedTopic;
  };

  return {
    topics,
    topic,
    loading,
    error,
    fetchTopics,
    fetchTopic,
    createTopic,
    updateTopic,
    deleteTopic,
  };
}
