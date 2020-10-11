import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'

function Home () {
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('user') === null || localStorage.getItem('user') === undefined) {
      console.log('you arent logged in')
      history.push('/')
    } else { console.log('you are still logged in') }
  })

  return (
    <div>
      <Navbar />
      <p>home</p>
    </div>
  )
}
export default Home
