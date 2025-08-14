import { Heart, MessageCircle, Share } from 'lucide-react';
import { cn } from '../lib/utils';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: number;
  likes: number;
  replies: any[];
}

interface PostItemProps {
  post: Post;
  onLike?: (postId: string) => void;
  onReply?: (postId: string) => void;
}

export function PostItem({ post, onLike, onReply }: PostItemProps) {
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  return (
    <article className="border-b border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/50 transition-colors">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
            {post.author.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-white">
              {post.author}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {formatTime(post.timestamp)}
            </span>
          </div>
          
          <p className="text-gray-800 dark:text-gray-200 mb-3 break-words">
            {post.content}
          </p>
          
          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
            <button
              onClick={() => onLike?.(post.id)}
              className="flex items-center gap-2 hover:text-red-500 transition-colors group"
            >
              <Heart 
                size={16} 
                className={cn(
                  'group-hover:scale-110 transition-transform',
                  post.likes > 0 ? 'fill-red-500 text-red-500' : ''
                )}
              />
              {post.likes > 0 && <span className="text-sm">{post.likes}</span>}
            </button>
            
            <button
              onClick={() => onReply?.(post.id)}
              className="flex items-center gap-2 hover:text-blue-500 transition-colors group"
            >
              <MessageCircle 
                size={16} 
                className="group-hover:scale-110 transition-transform" 
              />
              {post.replies.length > 0 && (
                <span className="text-sm">{post.replies.length}</span>
              )}
            </button>
            
            <button className="flex items-center gap-2 hover:text-green-500 transition-colors group">
              <Share 
                size={16} 
                className="group-hover:scale-110 transition-transform" 
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
