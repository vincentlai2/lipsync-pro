import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 'demo_key')

interface WaitlistData {
  email: string
  name: string
  company?: string
  useCase?: string
  monthlyVolume?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistData = await request.json()
    
    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get current timestamp
    const timestamp = new Date().toISOString()
    
    // Log the submission (in production, you'd save to database)
    console.log('=== NEW WAITLIST SIGNUP ===')
    console.log('Timestamp:', timestamp)
    console.log('Email:', body.email)
    console.log('Name:', body.name)
    console.log('Company:', body.company || 'Not provided')
    console.log('Use Case:', body.useCase || 'Not provided')
    console.log('Monthly Volume:', body.monthlyVolume || 'Not provided')
    console.log('========================')

    // TODO: In production, implement one of these:
    // 1. Save to database (PostgreSQL, MongoDB, etc.)
    // 2. Send to email service (Mailchimp, ConvertKit, etc.)
    // 3. Send notification email to mehelpme@gmail.com
    // 4. Add to Google Sheets or Airtable
    
    // For now, we'll simulate a successful response
    // You can replace this with actual email service integration
    
    try {
      // Send real confirmation email to user
      await sendConfirmationEmail(body.email, body.name)
      
      // Send notification to admin
      await sendAdminNotification(body)
      
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue anyway since we logged the data
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      timestamp: timestamp
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Send confirmation email to user
async function sendConfirmationEmail(email: string, name: string) {
  const fromEmail = process.env.FROM_EMAIL || 'noreply@lipsync.pro'
  
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Welcome to LipSync.pro Early Access! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Welcome to LipSync.pro Early Access!</h1>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for joining our early access waitlist! You're now part of an exclusive group of forward-thinking creators and businesses who will be the first to experience next-generation AI lip sync technology.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Your Early Access Benefits:</h3>
            <ul style="color: #1e40af;">
              <li>50% off your first year subscription</li>
              <li>Priority access when we launch in Q2 2025</li>
              <li>Direct feedback channel to our development team</li>
              <li>Free beta testing access before public release</li>
            </ul>
          </div>
          
          <p>We're working hard to bring you the most advanced AI lip sync technology. We'll keep you updated on our progress and notify you as soon as LipSync.pro is ready.</p>
          
          <p>In the meantime, feel free to explore our <a href="https://lipsync.pro/localization-tools-comparison" style="color: #3b82f6;">comparison of current tools</a> to see how we stack up against the competition.</p>
          
          <p>Best regards,<br>The LipSync.pro Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            You're receiving this because you signed up for early access to LipSync.pro. 
            If you have any questions, reply to this email or contact us at mehelpme@gmail.com.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('✅ Confirmation email sent successfully:', data)
    return data
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    // Fallback to console log if email fails
    console.log(`📧 CONFIRMATION EMAIL (fallback log)`)
    console.log(`To: ${email}`)
    console.log(`Subject: Welcome to LipSync.pro Early Access!`)
    console.log(`Name: ${name}`)
    throw error
  }
}

// Send notification to admin
async function sendAdminNotification(data: WaitlistData) {
  const fromEmail = process.env.FROM_EMAIL || 'noreply@lipsync.pro'
  const adminEmail = process.env.ADMIN_EMAIL || 'mehelpme@gmail.com'
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `🎯 New LipSync.pro Waitlist Signup - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Waitlist Signup!</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Usage Information:</h3>
            <p><strong>Use Case:</strong> ${data.useCase || 'Not provided'}</p>
            <p><strong>Monthly Volume:</strong> ${data.monthlyVolume || 'Not provided'}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Timestamp: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Admin notification error:', error)
      throw error
    }

    console.log('✅ Admin notification sent successfully:', emailData)
    return emailData
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    // Fallback to console log if email fails
    console.log(`📧 ADMIN NOTIFICATION (fallback log)`)
    console.log(`To: ${adminEmail}`)
    console.log(`Subject: New LipSync.pro Waitlist Signup`)
    console.log(`New signup from ${data.name} (${data.email})`)
    throw error
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Waitlist API is running',
    endpoints: {
      POST: 'Submit waitlist signup'
    }
  })
}