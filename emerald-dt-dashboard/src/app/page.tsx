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
