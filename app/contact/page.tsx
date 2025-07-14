import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
// import Canonical from '@/components/Canonical'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MessageSquare } from 'lucide-react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Contact Us - LipSync.pro Support',
  description: 'Get in touch with LipSync.pro team. Enterprise sales, technical support, and general inquiries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* <Canonical /> */}
      <Header />
      <main className="pt-20 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get in touch with our team for support, sales, or partnerships
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Mail className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Email Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">For general inquiries and support</p>
              <Button variant="outline" asChild>
                <a href="mailto:support@lipsync.pro">support@lipsync.pro</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Instant help during business hours</p>
              <Button variant="outline">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Sales Team</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Enterprise and custom solutions</p>
              <Button variant="outline" asChild>
                <a href="mailto:sales@lipsync.pro">sales@lipsync.pro</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

