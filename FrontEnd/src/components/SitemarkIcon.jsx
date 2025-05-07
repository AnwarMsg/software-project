import React from 'react';

const SitemarkLogo = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.oval}>
        <svg
          viewBox="0 0 64 64"
          width="40"
          height="40"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 2C17.64 2 6 13.64 6 28c0 14.92 21.55 33.4 24.48 35.94.96.84 2.08 1.26 3.19 1.26s2.23-.42 3.19-1.26C36.45 61.4 58 42.92 58 28 58 13.64 46.36 2 32 2zm0 59.13C29.17 58.23 8 40.15 8 28 8 15.85 18.85 5 32 5s24 10.85 24 23c0 12.15-21.17 30.23-24 33.13z" />
          <circle cx="32" cy="28" r="4" fill="white" />
          <path d="M46.47 22.24a18.18 18.18 0 0 0-28.94 0l-1.51-1.32a20.25 20.25 0 0 1 31.96 0zM24 43.5a12 12 0 0 1 16 0l1.42-1.4a14 14 0 0 0-18.84 0z" />
        </svg>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  oval: {
    backgroundColor: '#145A32',
    width: '180px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default SitemarkLogo;
