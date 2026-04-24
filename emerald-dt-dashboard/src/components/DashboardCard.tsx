"use client";
import React, { useState } from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  title: string;
  defaultColSpan?: string; // e.g., "col-span-2"
  defaultRowSpan?: string; // e.g., "row-span-1"
  expandedColSpan?: string;
  expandedRowSpan?: string;
  dark?: boolean;
}
