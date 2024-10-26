'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './DashBoard.module.css';

export default function DashBoard({ data }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (title) => {
    setOpenDropdown((prevTitle) => (prevTitle === title ? null : title));
  };

  const groupedData = data.reduce((acc, cur) => {
    if (!acc[cur.title]) acc[cur.title] = [];
    acc[cur.title].push(cur);
    return acc;
  }, {});

  return (
    <div className={styles.dashboard}>
      <div className={styles.buttonGrid}>
        {Object.keys(groupedData).map((title) => (
          <div key={title} className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => toggleDropdown(title)}
              aria-expanded={openDropdown === title}
              aria-controls={`dropdown-${title}`}
            >
              {title}
              <span className={styles.arrow}>{openDropdown === title ? '▲' : '▼'}</span>
            </button>
            {openDropdown === title && (
              <div id={`dropdown-${title}`} className={styles.dropdown}>
                {groupedData[title].map((item) => (
                  <Link key={item.id} href={`/Professor/Detail/${item.id}`} className={styles.link}>
                    <div className={styles.dropdownItem}>
                      {item.grade}학년 - {item.class}반
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
