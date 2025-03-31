import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar2.module.css';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: 'Sobre Nós', path: '/sobre' },
    { id: 3, label: 'Colaboradores', path: '/colaboradores' },
    { id: 4, label: 'Como ajudar?', path: '/como-ajudar' }, 
    { id: 5, label: 'Contato', path: '/contato' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-md navbar-light ${styles.navbarra}`}>
      <div className="container-fluid">
        <button 
          className={`navbar-toggler ${styles.toggler}`} 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className={`${styles.togglerIcon} ${isOpen ? styles.open : ''}`}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </span>
        </button>

        <div 
          className={`collapse navbar-collapse justify-content-center ${styles.menuContainer} ${isOpen ? 'show' : ''}`} 
          id="navbar2Content"
        >
          <ul className="navbar-nav align-items-center">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <li className={`nav-item ${styles.nav_item}`}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => 
                      isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
                {index !== menuItems.length - 1 && (
                  <span className={`${styles.span_nav_bar}`}>|</span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;