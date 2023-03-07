import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/main.module.css'
import { CssVarsProvider } from '@mui/joy/styles';
import Input from '@mui/joy/Input';

import Head from 'next/head';
import '@fontsource/public-sans';

import { useState } from 'react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [courses, setCourses] = useState([])

  const handleSearch = async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: searchTerm, filters: {
        "classNum": {
          "$lt" : 200
        }
      } })
    })
    const data = await response.json()
    setCourses(data)
  }

  return (
    
    <div className={styles['body']}>

      <Head>
      <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
    />
    </Head>
<CssVarsProvider>
<Input
  color="neutral"
  placeholder="Search for anything..."
  size="lg"
  variant="outlined"
/>
    </CssVarsProvider>

      <input type="text" className={styles['search-input']} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button className={styles['button']} onClick={handleSearch}>Search</button>
      <div>
      <div className={styles.search}>
        {courses.map((course) => (
          <div key={course.id} className={styles.card}>
            <h3>{course.data.id}: {course.data.title}</h3>
            <p>{course.data.description}</p>
            <p>{course.data.units} units</p>
            {/* <p>{course.data.prereqs}</p> */}
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Search

// export default IndexPage
