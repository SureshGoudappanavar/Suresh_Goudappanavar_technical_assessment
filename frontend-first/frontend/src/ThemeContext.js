import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  dark: {
    name: 'dark',
    // Main backgrounds
    appBg: '#0F172A',
    canvasBg: '#1E293B',
    
    // Toolbar & Footer
    toolbarBg: '#1E293B',
    toolbarBorder: '#334155',
    
    // Cards & Nodes
    cardBg: '#1E293B',
    cardBorder: '#334155',
    cardHoverBorder: '#475569',
    
    // Node specific
    nodeBg: '#1E293B',
    nodeBorder: '#334155',
    nodeHoverShadow: '0px 12px 32px rgba(0,0,0,0.4), 0px 4px 8px rgba(0,0,0,0.2)',
    nodeShadow: '0px 8px 24px rgba(0,0,0,0.3), 0px 2px 6px rgba(0,0,0,0.15)',
    
    // Text colors
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    
    // Input fields
    inputBg: '#0F172A',
    inputBorder: '#475569',
    inputFocusBorder: '#3B82F6',
    inputText: '#F1F5F9',
    
    // Buttons
    buttonGradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
    buttonShadow: '0px 8px 20px rgba(59,130,246,0.4)',
    buttonHoverShadow: '0px 12px 24px rgba(59,130,246,0.5)',
    
    // Canvas
    gridColor: '#334155',
    edgeColor: '#64748B',
    edgeSelectedColor: '#3B82F6',
    
    // MiniMap
    minimapBg: '#0F172A',
    minimapBorder: '#334155',
    minimapMask: 'rgba(15,23,42,0.8)',
    
    // Controls
    controlsBg: '#1E293B',
    controlsBorder: '#334155',
    
    // Draggable nodes
    draggableNodeBg: '#1E293B',
    draggableNodeShadow: '0px 4px 14px rgba(0,0,0,0.3)',
    draggableNodeHoverShadow: '0px 8px 20px rgba(0,0,0,0.4)',
    
    // Special backgrounds
    llmBg: '#2E1065',
    llmBorder: '#5B21B6',
    llmText: '#C4B5FD',
    
    outputBg: '#1E293B',
    outputBorder: '#475569',
    outputText: '#94A3B8',
  },
  
  light: {
    name: 'light',
    // Main backgrounds
    appBg: '#F1F5F9',
    canvasBg: '#F1F5F9',
    
    // Toolbar & Footer
    toolbarBg: '#FFFFFF',
    toolbarBorder: '#E2E8F0',
    
    // Cards & Nodes
    cardBg: '#FFFFFF',
    cardBorder: '#E5E7EB',
    cardHoverBorder: '#CBD5E1',
    
    // Node specific
    nodeBg: '#FFFFFF',
    nodeBorder: '#E5E7EB',
    nodeHoverShadow: '0px 12px 32px rgba(15,23,42,0.15), 0px 4px 8px rgba(15,23,42,0.08)',
    nodeShadow: '0px 8px 24px rgba(15,23,42,0.1), 0px 2px 6px rgba(15,23,42,0.05)',
    
    // Text colors
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    
    // Input fields
    inputBg: '#FFFFFF',
    inputBorder: '#CBD5E1',
    inputFocusBorder: '#2563EB',
    inputText: '#0F172A',
    
    // Buttons
    buttonGradient: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
    buttonShadow: '0px 8px 20px rgba(37,99,235,0.3)',
    buttonHoverShadow: '0px 12px 24px rgba(37,99,235,0.4)',
    
    // Canvas
    gridColor: '#CBD5E1',
    edgeColor: '#64748B',
    edgeSelectedColor: '#2563EB',
    
    // MiniMap
    minimapBg: '#FFFFFF',
    minimapBorder: '#E2E8F0',
    minimapMask: 'rgba(15,23,42,0.7)',
    
    // Controls
    controlsBg: '#FFFFFF',
    controlsBorder: '#E2E8F0',
    
    // Draggable nodes
    draggableNodeBg: '#FFFFFF',
    draggableNodeShadow: '0px 4px 14px rgba(15,23,42,0.06)',
    draggableNodeHoverShadow: '0px 8px 20px rgba(15,23,42,0.12)',
    
    // Special backgrounds
    llmBg: '#F5F3FF',
    llmBorder: '#DDD6FE',
    llmText: '#6B21A8',
    
    outputBg: '#F8FAFC',
    outputBorder: '#CBD5E1',
    outputText: '#64748B',
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
