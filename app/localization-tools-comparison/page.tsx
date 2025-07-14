import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Star, ExternalLink, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: 'Best AI Video Localization Tools Comparison 2025 | LipSync.pro',
  description: 'Compare top AI video localization tools: Synthesia, Papercup, Rask AI vs LipSync.pro. Find the best solution for multilingual video content.',
  keywords: 'AI video localization, video translation tools, lip sync technology, multilingual videos, video dubbing software, Synthesia vs Papercup, Rask AI comparison',
  authors: [{ name: "LipSync.pro" }],
  creator: "LipSync.pro",
  publisher: "LipSync.pro",
  metadataBase: new URL("https://lipsync.pro"),
  openGraph: {
    title: 'Best AI Video Localization Tools Comparison 2025',
    description: 'Compare top AI video localization tools and find the perfect solution for your multilingual video content needs.',
    url: 'https://lipsync.pro/localization-tools-comparison',
    siteName: 'LipSync.pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Video Localization Tools Comparison - Synthesia vs Papercup vs Rask AI vs LipSync.pro',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Video Localization Tools Comparison 2025',
    description: 'Compare Synthesia, Papercup, Rask AI vs LipSync.pro. Find the perfect AI video localization solution.',
    images: ['/og-image.png'],
    creator: '@lipsyncpro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function LocalizationToolsComparison() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* <Canonical /> */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Best AI Video Localization Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Compare the top AI-powered video localization and lip sync tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="relative ring-2 ring-blue-500 shadow-lg">
            <Badge className="absolute -top-3 left-4 bg-blue-500 text-white">
              Coming Soon
            </Badge>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎥</span>
                <div>
                  <CardTitle className="text-2xl">LipSync.pro</CardTitle>
                  <CardDescription>Next-generation AI lip sync technology</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Features</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                      Ultra-realistic lip sync
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                      Advanced AI technology
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                      Affordable pricing
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <a href="/">
                    Join Early Access Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎭</span>
                <div>
                  <CardTitle className="text-2xl">Synthesia</CardTitle>
                  <CardDescription>AI avatar-based video generation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">$30-$90/month</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.synthesia.io" target="_blank" rel="noopener noreferrer">
                    Visit Synthesia
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Next-Generation AI Lip Sync?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ people waiting for LipSync.pro - launching Q2 2025.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <a href="/">
              Join Early Access Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
