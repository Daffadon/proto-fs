import React, { useEffect, useState } from 'react';
import UserLayout from '../components/layout/UserLayout';
import { axiosClient } from '../api/axios/axios-client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteHandler = (itemToDelete) => {
    if (window.confirm('Are you sure want to delete?')) {
      axiosClient.delete(`/document/${itemToDelete.id}`).then(() => {
        //notif
        getDocument();
      });
    }
    return;
  };
  useEffect(() => {
    getDocument();
  }, []);

  const getDocument = () => {
    setLoading(true);
    axiosClient
      .get('/document')
      .then(({ data }) => {
        setDocuments(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <UserLayout>
      <div className="flex justify-center items-center mt-10">
        <p className="w-[80%] text-center font-bold text-lg">List Of Documents</p>
        <button
          className="bg-green-500 text-white px-10 py-2 rounded transition-all hover:bg-green-600"
          onClick={() => {
            navigate('/product/new');
          }}>
          New
        </button>
      </div>
      <div className="flex justify-center items-center flex-col mt-5 mb-10">
        {documents.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="flex w-[90%] justify-around gap mt-3 p-3 rounded-lg shadow-lg items-center">
            <p className="w-[2%] text-center">{item.id}</p>
            <div className="w-[80%]">
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.year}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-400 text-white px-10 py-2 rounded transition-all hover:bg-blue-500"
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}>
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-10 py-2 rounded transition-all hover:bg-red-600"
                onClick={deleteHandler.bind(this, item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default Dashboard;
