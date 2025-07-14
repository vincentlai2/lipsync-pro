import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'AI Lip Sync Blog | Latest News, Tutorials & Industry Insights | LipSync.pro',
  description: 'Stay updated with the latest AI lip sync technology news, tutorials, best practices, and industry insights.',
  keywords: ['AI lip sync blog', 'video dubbing tutorials', 'content creation tips'],
  openGraph: {
    title: 'AI Lip Sync Blog | Latest News, Tutorials & Industry Insights',
    description: 'Stay updated with the latest AI lip sync technology news, tutorials, best practices, and industry insights.',
    type: 'website',
    url: 'https://lipsync.pro/blog',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'LipSync.pro Blog'
    }]
  }
};

const blogPosts = [
  {
    title: 'What is AI Lip Sync? Complete Beginner Guide',
    description: 'Discover how artificial intelligence is revolutionizing video dubbing.',
    slug: '/what-is-ai-lip-sync',
    category: 'Guide',
    author: 'LipSync Team',
    publishDate: '2025-07-14',
    readTime: '10 min read',
    featured: true
  },
  {
    title: 'How to Create Lip Sync Videos',
    description: 'Expert guide on creating professional lip sync videos.',
    slug: '/how-to-create-lip-sync-videos',
    category: 'Tutorial',
    author: 'LipSync Team',
    publishDate: '2025-07-10',
    readTime: '12 min read',
    featured: true
  },
  {
    title: 'AI Lip Sync vs Traditional Dubbing',
    description: 'Compare AI lip sync with traditional dubbing methods.',
    slug: '/ai-lip-sync-vs-traditional-dubbing',
    category: 'Comparison',
    author: 'LipSync Team',
    publishDate: '2025-07-08',
    readTime: '15 min read',
    featured: true
  },
  {
    title: 'AI Lip Sync for E-Learning',
    description: 'Transform your educational content with AI lip sync.',
    slug: '/ai-lip-sync-for-elearning',
    category: 'Use Cases',
    author: 'LipSync Team',
    publishDate: '2025-07-06',
    readTime: '8 min read',
    featured: false
  }
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Blog</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Latest Updates</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Lip Sync Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stay updated with the latest AI lip sync technology news, tutorials, and insights.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.featured).map((post, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={post.slug}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg"></div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                          <Link href={post.slug}>{post.title}</Link>
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={post.slug}>Read More</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
