/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

/**
 * Emerald DT - Footer Final 
 * Calibrado para: 310px - 1900px
 * Author: NietoDeveloper
 */
export const Footer = () => {
  const [time, setTime] = useState(new Date());
  // FIX: Definición de currentYear para evitar ReferenceError
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour12: false
    }).toUpperCase();
  };

  return (

           
  
            
          
export default Footer;