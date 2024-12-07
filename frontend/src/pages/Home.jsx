import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import BlogPage from './BlogPage.jsx'

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Header />
        <BlogPage />
        <Footer />
      </div>
    </>
  )
}

export default Home
