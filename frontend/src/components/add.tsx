import axios from "axios"
import React, { useState } from "react"

interface AddProps {
  onClose: () => void
}

const Add: React.FC<AddProps> = ({onClose}) => {
  const [title, setTitle] = useState<string>("")
  const [info, setInfo] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.post("http://localhost:8000/new-book",
        {title, info, image}
      )
      if (response.data.success) {
        setSuccess(response.data.message);
        setTitle("");
        setInfo("");
        setImage("")
      } else if (response.data.error) {
        setError(response.data.message)
      }      
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5 md:p-0 z-50">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full space-y-6">
        <div className="flex items-center justify-between text-gray-800 font-bold text-xl">
          <h2>Add Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:font-bold transition duration-150"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Book description"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
          <input
            placeholder="Book image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
        {success && <p className="text-center text-green-600 font-semibold">{success}</p>}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </div>
    </div>
  )
}

export default Add