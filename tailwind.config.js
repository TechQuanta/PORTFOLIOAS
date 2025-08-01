export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust based on your file structure
  ],
  
  darkMode: 'class', // ✅ Place this outside the theme block
  theme: {
    extend: {
      colors: {
        aura: '#6366f1',
        flame: '#f59e0b',
        arcane: '#7e22ce',
        darksteel: '#0f172a',
        animation: {
          'spin-slow': 'spin 24s linear infinite',
        },
      },
      boxShadow: {
        'flame': '0 0 20px rgba(255, 115, 0, 0.5)',
        'aura': '0 0 25px rgba(255,255,255,0.2)',
      },
        
      
    },    
  boxShadow: {
    mystic: '0 0 20px rgba(108, 92, 231, 0.5)',
    gold: '0 0 20px rgba(241, 196, 15, 0.5)',
  }
}

};
