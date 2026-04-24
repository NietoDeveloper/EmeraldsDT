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
