'use client';
import styles from './AttendanceStatus.module.css';

const STATUS = {
    1: { label: '정상', color: '#4caf50' },
    2: { label: '지각', color: '#ff9800' },
    3: { label: '결석', color: '#f44336' },
    default: { label: '출결 전', color: '#b0bec5' },
};

export default function AttendanceStatus({ attendanceData }) {
    const getStatusCount = (label) => {
        return Object.keys(attendanceData).reduce((count, week) => {
            const weekData = attendanceData[week];
            const periodCount = Object.values(weekData).filter((d) => {
                const status = STATUS[d.status] || STATUS.default;
                return status.label === label;
            }).length;
            return count + periodCount;
        }, 0);
    };

    return (
        <div className={styles.attendanceContainer}>
            {/* Legend */}
            <div className={styles.legend}>
                {Object.values(STATUS).map((status, index) => (
                    <div key={index} className={styles.legendItem}>
                        <span
                            className={styles.colorIndicator}
                            style={{ backgroundColor: status.color }}
                        ></span>
                        {status.label} {getStatusCount(status.label)}건
                    </div>
                ))}
            </div>

            {/* Weekly Attendance */}
            <div className={styles.statusGrid}>
                {Object.keys(attendanceData).map((week) => (
                    <div key={week} className={styles.weekColumn}>
                        <span className={styles.weekNumber}>{week}주차</span>
                        <div className={styles.periodGrid}>
                            {Object.keys(attendanceData[week]).map((period) => {
                                const status =
                                    STATUS[attendanceData[week][period].status] || STATUS.default;
                                return (
                                    <div
                                        key={period}
                                        className={styles.statusBox}
                                        style={{ backgroundColor: status.color }}
                                    >
                                        <span className={styles.periodLabel}>{period}교시</span>
                                        <span className={styles.statusLabel}>{status.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
