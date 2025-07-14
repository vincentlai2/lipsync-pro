import { Metadata } from 'next'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - LipSync.pro',
  description: 'LipSync.pro privacy policy and data protection information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: July 10, 2025
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Collection</h2>
            <p className="text-gray-600 mb-6">
              We collect minimal data necessary to provide our AI lip sync services. This includes uploaded videos, 
              audio files, and generated content for processing purposes only.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-600 mb-6">
              All data is encrypted in transit and at rest. We automatically delete your uploaded content 
              within 24 hours of processing unless you choose to save it to your account.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              For privacy questions, contact us at privacy@lipsync.pro
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

