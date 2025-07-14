import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import Canonical from '@/components/Canonical'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Changelog - LipSync.pro Updates',
  description: 'Latest updates, features, and improvements to LipSync.pro AI lip sync generator.',
}

export default function ChangelogPage() {
  const updates = [
    {
      version: 'v2.1.0',
      date: 'July 10, 2025',
      type: 'major',
      changes: [
        'Added 10 new languages support',
        'Improved AI model accuracy by 15%',
        'Enhanced API rate limiting',
        'Better error handling'
      ]
    },
    {
      version: 'v2.0.5',
      date: 'June 25, 2025',
      type: 'patch',
      changes: [
        'Fixed processing timeout issues',
        'Improved video quality compression',
        'UI performance optimizations'
      ]
    },
    {
      version: 'v2.0.0',
      date: 'June 1, 2025',
      type: 'major',
      changes: [
        'Complete UI redesign',
        'New AI model release',
        'API v2 launch',
        'Enterprise features'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* <Canonical /> */}
      <Header />
      <main className="pt-20 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Changelog</h1>
          <p className="text-xl text-gray-600 mb-12">
            Track the latest updates and improvements to LipSync.pro
          </p>

          <div className="space-y-8">
            {updates.map((update, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      {update.version}
                      <Badge variant={update.type === 'major' ? 'default' : 'secondary'}>
                        {update.type}
                      </Badge>
                    </CardTitle>
                    <span className="text-gray-500">{update.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-2">â€?/span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

