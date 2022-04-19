export interface Card {
  colors: string[];
  color?: string;
  id: string;
  imageUrl: string;
  manaCost: string;
  name: string;
  originalText: string;
  originalType: string;
  rarity: string;
  power:string;
  powerToughness?:string;
  toughness: string;
  types: string[];
}
