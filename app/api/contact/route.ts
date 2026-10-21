import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const esc = (s: unknown = '') =>
  String(s).replace(
    /[<>&"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string)
  )

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message, ref_source } = body

    // Honeypot — real users never fill this. Pretend success so bots don't learn.
    if (ref_source) return NextResponse.json({ ok: true })

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New inquiry from ${String(name).slice(0, 80)}${
        service ? ` — ${String(service).slice(0, 40)}` : ''
      }`,
      html: `
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone) || '—'}</p>
        <p><strong>Service:</strong> ${esc(service) || '—'}</p>
        <hr />
        <p>${esc(message).replace(/\n/g, '<br />')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}