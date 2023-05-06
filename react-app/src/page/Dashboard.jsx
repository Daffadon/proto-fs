import React, { useEffect, useState } from 'react'
import UserLayout from '../components/layout/UserLayout'
import { axiosClient } from '../api/axios/axios-client';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDocument = () => {
      setLoading(true);
      axiosClient.get('/document')
        .then(({ data }) => {
          setDocuments(data.data);
          console.log(data.data)
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false)
        })
    }
    getDocument();
  }, [])

  return (
    <UserLayout>
      <div>Dashboard</div>
    </UserLayout>
  )
}

export default Dashboard