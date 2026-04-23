import React from 'react';

// DashboardCard: El átomo de la interfaz con hover effects y bordes dorados sutiles
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  dark = false
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  dark?: boolean
