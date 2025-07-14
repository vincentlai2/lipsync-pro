'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <title>Error - LipSync.pro</title>
        <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
      </head>
      <body className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We encountered an unexpected error. Please try refreshing the page or go back to our homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={reset}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
