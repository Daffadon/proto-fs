import React, { useEffect, useState } from 'react'
import UserLayout from '../components/layout/UserLayout'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../api/axios/axios-client';

const AddDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [titleName, setTitleName] = useState('');
  const [document, setDocument] = useState({
    id: null,
    name: '',
    description: '',
    year: '',
  })

  if (id) {
    useEffect(() => {
      axiosClient.get(`/document/${id}`)
        .then(({ data }) => {
          setDocument(data)
          setTitleName(data.name)
        })
    }, [])
  }
  const saveHandler = (e) => {
    e.preventDefault()
    if (document.id) {
      axiosClient.patch(`/document/${document.id}`, document)
        .then(() => {
          navigate('/product');
        })
        .catch((error) => {
          const response = error.response
          if (response && response.status === 422) {
            setError(response.data.errors)
          }
        })
    } else {
      axiosClient.post(`/document/`, document)
        .then(() => {
          navigate('/product');
        })
        .catch(() => {

        })
    }
  }

  return (
    <UserLayout>
      <div className="flex justify-center items-center h-[90vh]">
        <div className=' bg-slate-600 w-4/12 h-[80vh] flex justify-center items-center py-5 pb-10 rounded-lg'>
          <form onSubmit={saveHandler} className="flex flex-col gap-4 w-6/12">
            {document.id ?
              <p className="text-center font-bold text-lg text-white"> On Update : {titleName}</p>
              :
              <p className="text-center font-bold text-lg text-white">Document</p>
            }
            {error &&
              <div className='bg-red-600 p-3 roundedp'>
                {Object.keys(error).map(key => (
                  <p key={key} className='text-white'>{error[key][0]}</p>
                ))}
              </div>
            }
            <input type="text" value={document.name}
              onChange={e => {
                setDocument({ ...document, name: e.target.value })
              }}
              placeholder="Name" className="border rounded px-3 outline-none py-1 placeholder-yellow-500" />
            <textarea
              cols="30"
              rows="10"
              value={document.description}
              className='resize-none border rounded px-3 outline-none py-1 placeholder-yellow-500'
              onChange={e => {
                setDocument({ ...document, description: e.target.value })
              }}
              placeholder='Description'></textarea>
            <input type="text" placeholder='Year'
              value={document.year}
              className='resize-none border rounded px-3 outline-none py-1 placeholder-yellow-500'
              onChange={e => {
                setDocument({ ...document, year: e.target.value })
              }} />
            {document.id ?
              <button type="submit" className=" bg-amber-300 py-2 rounded outline-none">Save</button>
              :
              <button type="submit" className=" bg-amber-300 py-2 rounded outline-none">Add</button>
            }
          </form>
        </div>
      </div>
    </UserLayout>
  )
}

export default AddDocument