import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Meme } from '../types';
import { enhanceMemes } from '../utils/memeUtils';

interface MemeContextType {
  memes: Meme[];
  loading: boolean;
  error: Error | null;
  getMemeById: (id: string) => Meme | undefined;
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export const MemeProvider = ({ children }: { children: ReactNode }) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        if (!response.ok) {
          throw new Error('Failed to fetch memes');
        }
        const data = await response.json();
        const enhancedMemes = enhanceMemes(data.data.memes);
        setMemes(enhancedMemes);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const getMemeById = (id: string) => {
    return memes.find((meme) => meme.id === id);
  };

  return (
    <MemeContext.Provider value={{ memes, loading, error, getMemeById }}>
      {children}
    </MemeContext.Provider>
  );
};

export const useMemes = () => {
  const context = useContext(MemeContext);
  if (!context) {
    throw new Error('useMemes must be used within a MemeProvider');
  }
  return context;
};
