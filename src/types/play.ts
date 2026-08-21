export interface User {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  _id: string;
  user: User;
  comment: string;
  timestamp: string;
}

export interface Play {
  _id: string;
  title: string;
  description?: string;
  genre?: string;
  likes: number;
  starred: number;
  rating?: number;
  liked_by: string[];
  starred_by: string[];
  comments: Comment[];
  thumbnail_url: string;
  stream_url?: string;
  is_live: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlayInteraction {
  _id: string;
  likes: number;
  rating?: number;
  starred: number;
  comments: Comment[];
  is_liked: boolean;
  is_starred: boolean;
}

export interface Reaction {
  emoji: string;
  userId: string;
}
