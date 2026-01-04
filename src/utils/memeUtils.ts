import type { ApiMemeResponse, Meme } from '../types';

export const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"];

export const enhanceMemes = (apiMemes: ApiMemeResponse['data']['memes']): Meme[] => {
  return apiMemes.map((meme) => {
    const rating = Math.floor(Math.random() * 5) + 1;
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const price = rating * 25;

    return {
      ...meme,
      rating,
      category,
      price,
    };
  });
};
