'use client';
import React from 'react';
import styles from './AttendanceStatus.module.css';

export default function AttendanceStatus({ attendanceData }) {
  const statusColor = {
    정상: 'blue',
    지각: 'orange',
    결석: 'red',
    null: 'lightgray',
  };

  return (
    <div className={styles.attendanceContainer}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.statusBox} style={{ backgroundColor: 'lightgray' }}></span>
          출결 전 {attendanceData.filter((d) => d.type === 'null').length}건
        </div>
        <div className={styles.legendItem}>
          <span className={styles.statusBox} style={{ backgroundColor: 'blue' }}></span>
          출석 {attendanceData.filter((d) => d.type === '정상').length}건
        </div>
        <div className={styles.legendItem}>
          <span className={styles.statusBox} style={{ backgroundColor: 'orange' }}></span>
          지각 {attendanceData.filter((d) => d.type === '지각').length}건
        </div>
        <div className={styles.legendItem}>
          <span className={styles.statusBox} style={{ backgroundColor: 'red' }}></span>
          결석 {attendanceData.filter((d) => d.type === '결석').length}건
        </div>
      </div>

      <div className={styles.statusGrid}>
        {attendanceData.map((weekInfo, index) => (
          <div key={index} className={styles.statusColumn}>
            <span className={styles.weekNumber}>{weekInfo.week}주차</span>
            <div className={styles.statusBox} style={{ backgroundColor: statusColor[weekInfo.type] }}>
              {weekInfo.type === 'null' ? '출결 전' : weekInfo.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
