import React, { use } from 'react'
import { useState } from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [user, setUser] = useState({ name: 'Miriam', idade: 19 })

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.link_list}>
          <li>Home</li>
          <li>Register</li>
          <li>New Post</li>
          <li>Dashboard</li>
          <li>About Us</li>
          <li>
            <button className={styles.logout}>Exit</button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar