'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Send, User } from 'lucide-react'

interface Post {
  id: number
  content: string
  author: string
  timestamp: Date
  likes: number
  comments: number
  liked: boolean
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Sample initial data
  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: 1,
        content: 'Just built an amazing Next.js microblog prototype! 🚀 The future of social media is here.',
        author: 'TechEnthusiast',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 42,
        comments: 7,
        liked: false
      },
      {
        id: 2,
        content: 'Beautiful sunset today! Sometimes we need to pause and appreciate the simple moments in life 🌅',
        author: 'NatureLover',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 23,
        comments: 3,
        liked: true
      }
    ]
    setPosts(samplePosts)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    setIsLoading(true)
    
    const post: Post = {
      id: Date.now(),
      content: newPost,
      author: 'You',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      liked: false
    }

    setTimeout(() => {
      setPosts(prev => [post, ...prev])
      setNewPost('')
      setIsLoading(false)
    }, 500)
  }

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours === 1) return '1 hour ago'
    return `${diffInHours} hours ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Microblog Prototype</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  maxLength={280}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-sm ${
                    newPost.length > 250 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {280 - newPost.length} characters remaining
                  </span>
                  <button
                    type="submit"
                    disabled={!newPost.trim() || isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isLoading ? 'Posting...' : 'Post'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                    <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-2 text-sm transition-colors ${
                        post.liked 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          post.liked ? 'fill-current' : ''
                        }`} 
                      />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  )
}
