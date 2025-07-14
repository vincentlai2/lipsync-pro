import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { Home, BookOpen, Video, Lightbulb, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '404 - Page Not Found | LipSync.pro',
  description: 'The page you are looking for could not be found. Explore our AI lip sync tools and resources.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <span className="text-4xl font-bold text-blue-600">404</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sorry, we couldn't find the page you're looking for. The link may be broken or the page may have been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Blog
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <Link href="/what-is-ai-lip-sync" className="hover:text-blue-600 transition-colors">
                      What is AI Lip Sync?
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Complete beginner guide to AI lip sync technology
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Video className="w-5 h-5" />
                    </div>
                    <Link href="/how-to-create-lip-sync-videos" className="hover:text-blue-600 transition-colors">
                      How to Create Lip Sync Videos
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Step-by-step guide for AI vs manual methods
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <Link href="/ai-lip-sync-guide" className="hover:text-blue-600 transition-colors">
                      AI Lip Sync Guide
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Best practices and techniques for professionals
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <Link href="/ai-lip-sync-vs-traditional-dubbing" className="hover:text-blue-600 transition-colors">
                      AI vs Traditional Dubbing
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Complete comparison of methods and costs
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>Still can't find what you're looking for?</CardTitle>
              <CardDescription>
                Our team is here to help you get the most out of AI lip sync technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    Browse All Articles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2"></span>
              <span>404 Error</span>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
