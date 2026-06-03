import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: ''
  })
  const [editingId, setEditingId] = useState(null)

  const API_URL = 'http://localhost:8000'

  useEffect(()=>{
    fetchAllBooks()
}, [])

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`)
      setBooks(response.data)
    } catch (error){
      console.error('Error: ', error)
    }
  }

  const createBook = async(e) => {
    e.preventDefault()
    try{
      await axios.post(`${API_URL}/books`, {
        title: formData.title,
        author: formData.author,
        published_year: parseInt(formData.published_year)
      })
      setFormData({title: '', author: '', published_year: ''})
      fetchAllBooks()
    }catch(error){
      console.error("Error ", error)
      alert('Error adding book')
    }
  }

  const updateBook = async(e) => {
    e.preventDefault()
    try{
      await axios.put(`${API_URL}/books/${editingId}`, {
        title: formData.title,
        author: formData.author,
        published_year: parseInt(formData.published_year)
      })
      setFormData({title: '', author: '', published_year:''})
      setEditingId(null)
      fetchAllBooks()
    } catch (error){
      console.error('Error updating book: ', error)
      alert("Error updating book!")
    }
  }

  const deleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')){
      try {
        await axios.delete(`${API_URL}/books/${bookId}`)
        fetchAllBooks()
      } catch (error){
        console.error('Error deleting book: ', error)
        alert('Error deleting book')
      }
    }
  }

    const startEdit = (book) => {
    setEditingId(book.id)
    setFormData({
      title: book.title,
      author: book.author,
      published_year: book.published_year
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ title: '', author: '', published_year: '' })
  }

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '10px' }}>Book Management System</h2>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'flex-start',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 20px',
        height: 'calc(100vh - 100px)',
        boxSizing: 'border-box'
      }}>
        
        {/* Form Container */}
        <div className="card" style={{ 
          flex: '0 0 380px',
          minWidth: '300px',
          maxWidth: '380px',
          border: '1.5px solid #000000',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '70vh',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>
            {editingId ? 'Update Book' : 'Add New Book'}
          </h3>
          <form onSubmit={editingId ? updateBook : createBook} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            flex: 1,
            overflow: 'auto'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>
                Title
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>
                Author
              </label>
              <input
                type="text"
                placeholder="Enter author name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>
                Published Year
              </label>
              <input
                type="number"
                placeholder="Enter publication year"
                value={formData.published_year}
                onChange={(e) => setFormData({ ...formData, published_year: e.target.value })}
                required
                min="1801"
                max="2025"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button type="submit" style={{ flex: '1', padding: '10px' }}>
                {editingId ? 'Update Book' : 'Add Book'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} style={{ flex: '1', padding: '10px' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Container */}
        <div className="card" style={{ 
          flex: '1',
          minWidth: '700px',
          maxWidth: '1200px',
          border: '1.5px solid #000000',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '70vh',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Books List</h3>
          {books.length === 0 ? (
            <p>No book available</p>
          ) : (
            <div style={{ 
              overflowY: 'auto',
              overflowX: 'hidden',
              flex: 1
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                tableLayout: 'fixed'
              }}>
                <thead style={{ 
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  zIndex: 1
                }}>
                  <tr>
                    <th style={{ 
                      borderLeft: '1px solid #000000', 
                      padding: '8px', 
                      width: '35%' 
                    }}>Title</th>
                    <th style={{ 
                      borderLeft: '1px solid #000000', 
                      padding: '8px', 
                      width: '25%' 
                    }}>Author</th>
                    <th style={{ 
                      borderLeft: '1px solid #000000', 
                      padding: '8px', 
                      width: '15%' 
                    }}>Year</th>
                    <th style={{ 
                      borderLeft: '1px solid #000000', 
                      borderRight: '1px solid #000000', 
                      padding: '8px', 
                      width: '25%' 
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td 
                        style={{ 
                          border: '1px solid #000000',
                          borderTop: '1px solid #ffffff',
                          padding: '8px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          wordBreak: 'break-all'
                        }}
                        title={book.title}
                      >
                        {book.title}
                      </td>
                      <td 
                        style={{ 
                          border: '1px solid #000000', 
                          borderTop: '1px solid #ffffff',
                          padding: '8px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={book.author}
                      >
                        {book.author}
                      </td>
                      <td style={{ 
                        border: '1px solid #000000', 
                        borderTop: '1px solid #ffffff', 
                        padding: '8px', 
                        textAlign: 'center' }}>
                        {book.published_year}
                      </td>
                      <td style={{ 
                        border: '1px solid #000000', 
                        borderTop: '1px solid #ffffff',
                        padding: '8px', 
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}>
                        <button 
                          onClick={() => startEdit(book)} 
                          style={{ 
                            marginRight: '8px',
                            padding: '6px 12px',
                            minWidth: '60px'
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteBook(book.id)}
                          style={{ 
                            padding: '6px 12px',
                            minWidth: '60px'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App