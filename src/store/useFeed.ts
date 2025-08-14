import { create } from 'zustand';

export interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: number;
  likes: number;
  replies: Post[];
}

interface FeedState {
  posts: Post[];
  isComposerOpen: boolean;
}

interface FeedActions {
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  openComposer: () => void;
  closeComposer: () => void;
  setPosts: (posts: Post[]) => void;
}

type FeedStore = FeedState & FeedActions;

const initialPosts: Post[] = [
  {
    id: '1',
    content: 'Welcome to the microblog! This is your first post. Start sharing your thoughts with the world.',
    author: 'System',
    timestamp: Date.now() - 300000, // 5 minutes ago
    likes: 2,
    replies: [],
  },
  {
    id: '2',
    content: 'Just built an amazing React component with Tailwind CSS. The developer experience is incredible! 🚀',
    author: 'Developer',
    timestamp: Date.now() - 600000, // 10 minutes ago
    likes: 5,
    replies: [],
  },
];

export const useFeed = create<FeedStore>((set) => ({
  posts: initialPosts,
  isComposerOpen: false,
  
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      ),
    })),
  
  openComposer: () => set({ isComposerOpen: true }),
  closeComposer: () => set({ isComposerOpen: false }),
  
  setPosts: (posts) => set({ posts }),
}));
