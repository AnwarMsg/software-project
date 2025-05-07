// src/shared-theme/ColorModeSelect.js
import React from 'react';

const ColorModeSelect = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ColorModeSelect;
