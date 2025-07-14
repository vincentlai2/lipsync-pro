import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Complete AI Lip Sync Guide 2025 | LipSync.pro',
  description: 'Master AI lip sync technology with our comprehensive guide. Learn best practices, techniques, and advanced video production methods for professional dubbing.',
  keywords: ['AI lip sync guide', 'video dubbing guide', 'lip sync tutorial', 'artificial intelligence dubbing', 'automated voice synchronization', 'video production tools', 'facial animation', 'speech synthesis', 'voice cloning', 'multilingual content creation'],
  openGraph: {
    title: 'Complete AI Lip Sync Guide 2025',
    description: 'Master AI lip sync technology with our comprehensive guide.',
    type: 'article',
    url: 'https://lipsync.pro/ai-lip-sync-guide',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Complete AI Lip Sync Guide'
    }]
  }
};

export default function AILipSyncGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li>/</li>
              <li className="text-foreground">AI Lip Sync Guide</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">Complete Guide</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Complete AI Lip Sync Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Master artificial intelligence-powered lip synchronization technology. Learn advanced video production techniques, facial animation methods, and automated dubbing tools for creating professional-quality multilingual content.
              </p>
              
              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/#demo">Try AI Lip Sync Free</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/what-is-ai-lip-sync">Learn the Basics First</Link>
                </Button>
              </div>
            </header>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-6">Getting Started with AI Lip Sync</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">What You Need</h3>
                        <ul className="space-y-2">
                          <li> High-quality source video</li>
                          <li> Clear audio track or script</li>
                          <li> AI lip sync tool (like LipSync.pro)</li>
                          <li> Basic understanding of video editing</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Start Steps</h3>
                        <ol className="space-y-2">
                          <li>1. Upload your video</li>
                          <li>2. Add new audio or text</li>
                          <li>3. Generate lip sync</li>
                          <li>4. Review and download</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Best Practices for Quality Results</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Video Quality Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li> Use 1080p or higher resolution</li>
                        <li> Ensure good lighting on the face</li>
                        <li> Keep the subject facing forward</li>
                        <li> Minimize background distractions</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Audio Quality Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li> Use clear, high-quality audio</li>
                        <li> Match speaking pace with original</li>
                        <li> Remove background noise</li>
                        <li> Consider voice tone and emotion</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardContent className="py-12 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Create Professional Lip Sync Videos?</h3>
                  <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                    Put your knowledge to practice with our AI-powered lip sync generator.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/#demo">Start Free Trial</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" asChild>
                      <Link href="/contact">Get Expert Help</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
