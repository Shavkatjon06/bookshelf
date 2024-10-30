import React, { useEffect, useState } from "react"
import axios from 'axios'
import Book from "../interfaces/book.ts"
import Add from "../components/add.tsx"
import { IoMdRefreshCircle, IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [addModal, setAddModal] = useState<boolean>(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:8000/books")
      if (response.data.success) {
        setBooks(response.data.message)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number | undefined) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete-book/${id}`)
      if (response.data.success) {
        setBooks(prev => prev.filter(i => i.id !== id))
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError((error as Error).message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClose = () => setAddModal(false)

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Book List</h1>
      <h1 className="text-xl font-bold text-center my-3 text-red-500">{error}</h1>
      <div className="flex justify-end items-center mb-4 gap-3 text-3xl">
        <IoMdRefreshCircle className="cursor-pointer" onClick={fetchData}/>
        <IoMdAddCircleOutline className="cursor-pointer" onClick={() => setAddModal(true)} />
      </div>
      {addModal && <Add onClose={handleClose} />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {loading ? (
          <p className="text-gray-500 text-center animate-pulse col-span-full">Loading books...</p>
        ) : (
          books.length > 0 && books.map((book) => (
            <div 
              key={book.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.005] hover:shadow-xl">
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover" />
              <div className="p-5">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{book.title}</h2>
                <p className="text-gray-700 hidden md:line-clamp-3">{book.info}</p>
                <div className="flex justify-end items-center mt-3 gap-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer"><Link to={`/edit/${book.id}`}>Edit</Link></button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer" onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Books