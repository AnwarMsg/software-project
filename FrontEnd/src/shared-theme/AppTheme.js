// src/shared-theme/AppTheme.js

const AppTheme = {
    // Color Palette
    colors: {
      primary: "#6200EE",       // Main color (purple in this case)
      secondary: "#03DAC6",     // Accent color (cyan)
      background: "#FFFFFF",    // Background color (white)
      text: "#000000",          // Default text color (black)
      error: "#B00020",         // Error color (red)
      success: "#4CAF50",       // Success color (green)
    },
  
    // Typography (Fonts, Sizes)
    typography: {
      fontFamily: "'Roboto', sans-serif",  // Default font family
      fontSize: "16px",                   // Default font size for text
      headingFontSize: "24px",            // Font size for headings
      lineHeight: "1.5",                  // Line height for readability
    },
  
    // Spacing (Padding, Margin)
    spacing: {
      small: "8px",   // Small space, for small elements
      medium: "16px", // Standard spacing for padding/margins
      large: "24px",  // Larger spacing for bigger elements
    },
  
    // Responsive Breakpoints
    breakpoints: {
      mobile: "600px",    // Mobile devices
      tablet: "768px",    // Tablets
      desktop: "1024px",  // Desktops
    },
  
    // Borders
    borders: {
      radius: "4px",   // Border radius for rounded corners
      width: "1px",    // Border width (for borders)
    },
  
    // Shadows
    shadows: {
      small: "0 1px 2px rgba(0, 0, 0, 0.1)",  // Subtle shadow for elements
      large: "0 4px 6px rgba(0, 0, 0, 0.2)",  // Larger shadow for important components
    },
  
    // Optional: Light and Dark Themes
    lightMode: {
      background: "#FFFFFF",
      text: "#000000",
    },
    darkMode: {
      background: "#121212",
      text: "#FFFFFF",
    },
  };
  
  export default AppTheme;
  