import { Metadata } from 'next'
import Link from 'next/link'
import Canonical from '@/components/Canonical'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  Users, 
  Award, 
  Code, 
  Brain, 
  Video,
  ArrowLeft,
  Mail,
  Twitter,
  Linkedin
} from 'lucide-react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Meet the LipSync.pro Team | AI Lip Sync Experts',
  description: 'Meet the talented team behind LipSync.pro - AI researchers, engineers, and video processing experts dedicated to creating the best lip sync technology.',
  keywords: 'LipSync.pro team, AI researchers, video processing experts, lip sync technology team, artificial intelligence engineers',
  openGraph: {
    title: 'Meet the LipSync.pro Team | AI Lip Sync Experts',
    description: 'Meet the talented team behind LipSync.pro - AI researchers, engineers, and video processing experts.',
    url: 'https://lipsync.pro/author/lipsync-team',
  },
  twitter: {
    title: 'Meet the LipSync.pro Team | AI Lip Sync Experts',
    description: 'Meet the talented team behind LipSync.pro - AI researchers, engineers, and video processing experts.',
  },
}

export default function LipSyncTeamPage() {
  const teamMembers = [
    {
      name: 'Dr. Alex Chen',
      role: 'Chief AI Researcher',
      bio: 'PhD in Computer Vision from MIT. 10+ years experience in deep learning and neural networks.',
      avatar: '/placeholder-user.jpg',
      skills: ['Deep Learning', 'Computer Vision', 'Neural Networks'],
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Software Engineer',
      bio: 'Full-stack engineer specializing in real-time video processing and scalable web applications.',
      avatar: '/placeholder-user.jpg',
      skills: ['React', 'Node.js', 'Video Processing'],
    },
    {
      name: 'Michael Rodriguez',
      role: 'AI Engineer',
      bio: 'Machine learning specialist focused on speech synthesis and lip synchronization algorithms.',
      avatar: '/placeholder-user.jpg',
      skills: ['Machine Learning', 'Python', 'TensorFlow'],
    },
    {
      name: 'Emily Zhang',
      role: 'Product Designer',
      bio: 'UX/UI designer with expertise in creating intuitive interfaces for complex AI tools.',
      avatar: '/placeholder-user.jpg',
      skills: ['UI/UX Design', 'Figma', 'User Research'],
    },
  ]

  const companyStats = [
    { icon: Users, label: 'Team Members', value: '15+' },
    { icon: Globe, label: 'Countries Served', value: '50+' },
    { icon: Video, label: 'Videos Processed', value: '1M+' },
    { icon: Award, label: 'Years Experience', value: '8+' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* <Canonical /> */}
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">LipSync Team</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Meet Our Team
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Minds Behind LipSync.pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're a passionate team of AI researchers, engineers, and designers dedicated to revolutionizing 
              video content creation through cutting-edge lip synchronization technology.
            </p>
            
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Link href="/">
                Try Our AI Lip Sync Generator
              </Link>
            </Button>
          </div>
        </section>

        {/* Company Stats */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the talented individuals who make LipSync.pro the leading AI lip sync platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission & Values
                </h2>
                <p className="text-xl text-gray-600">
                  We believe in democratizing advanced AI technology and making it accessible to creators worldwide.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We push the boundaries of AI technology to create groundbreaking solutions 
                    for video content creators.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                  <p className="text-gray-600">
                    We make advanced AI tools accessible to everyone, from individual creators 
                    to large enterprises.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                  <p className="text-gray-600">
                    We're committed to delivering the highest quality results and user experience 
                    in every product we build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Our Technology?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of creators who trust LipSync.pro for their video content needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/">
                  <Video className="w-4 h-4 mr-2" />
                  Try Free Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
