 "use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Mail, User, Building } from "lucide-react"

interface FormData {
  email: string
  name: string
  company: string
  useCase: string
}

export function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    useCase: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.name) {
      alert('Please fill in your email and name.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Please try again or contact us at mehelpme@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-600">Welcome to the waitlist!</h3>
        <p className="text-gray-600">
          Thanks for joining! We'll notify you when LipSync.pro is ready.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>What's next?</strong><br />
            • We'll send you updates on our progress<br />
            • You'll get early access when we launch<br />
            • Special pricing for early supporters
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          Company (Optional)
        </Label>
        <Input
          id="company"
          type="text"
          placeholder="Your company"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="useCase">
          What will you use LipSync.pro for? (Optional)
        </Label>
        <Textarea
          id="useCase"
          placeholder="e.g., Marketing videos, Educational content, Social media..."
          value={formData.useCase}
          onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
          className="min-h-[80px]"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Early Access Benefits:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ 50% off first year subscription</li>
          <li>✓ Priority access when we launch</li>
          <li>✓ Direct feedback channel to our team</li>
        </ul>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining waitlist...
          </>
        ) : (
          'Join Early Access Waitlist'
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. No spam, just updates about LipSync.pro.
      </p>
    </form>
  )
}