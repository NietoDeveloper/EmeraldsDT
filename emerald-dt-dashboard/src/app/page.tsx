"use client";
import React, { useState } from 'react';

// DashboardCard: Estética SpaceX optimizada
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  defaultCol = "xl:col-span-1",
  defaultRow = "row-span-1",
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  defaultCol?: string,
  defaultRow?: string,
}) => {
  return (
    <div 
      className={`
        bg-black border border-white/10 rounded-2xl p-4 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:border-[#D4AF37]/40 group relative overflow-hidden 
        ${defaultCol} ${defaultRow}
        ${className}

