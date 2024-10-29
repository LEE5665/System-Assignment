'use client';

import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.spinnerOverlay} role="status" aria-live="polite">
      <ClipLoader color="#0070f3" size={60} />
      <div className={styles.loadingText}>로딩 중...</div>
    </div>
  );
}
