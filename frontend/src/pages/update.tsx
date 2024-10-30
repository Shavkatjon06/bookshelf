import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Book from "../interfaces/book";
import axios from "axios";

const Update: React.FC = () => {
  const [data, setData] = useState<Book | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        if (response.data.success) {
          setData(response.data.message[0]);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/update/${id}`, data);
      if (response.data.success) {
        window.location.href = '/';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-center text-xl font-semibold text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-red-500 font-bold text-lg">{error}</p>
      ) : (
        data && (
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Update Book</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Info</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={data.info}
                  rows={6}
                  onChange={(e) => setData({ ...data, info: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={data.image}
                  onChange={(e) => setData({ ...data, image: e.target.value })}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition duration-200"
              >
                Update Book
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Update