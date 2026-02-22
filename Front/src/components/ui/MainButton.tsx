import React from 'react';

interface Props {
  text: string;
  variant?: 'white' | 'gold' | 'emerald';
}

export const MainButton = ({ text, variant = 'white' }: Props) => {
  const themes = {
    white: "border-white text-white hover:bg-white hover:text-black",
    gold: "border-gold text-gold hover:bg-gold hover:text-black",
    emerald: "border-emerald text-emerald hover:bg-emerald hover:text-white"
  };

  return (
    <button className={`
      px-10 py-4 border-2 font-bold uppercase tracking-widest transition-all duration-300
      ${themes[variant]}
    `}>
      {text}
    </button>
  );
};