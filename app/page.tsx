import { ArrowUpRight, Clock3, Mail, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export default function Page() {
  const companyName = 'MozzaBot'
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@mozzabot.com'
  const availability = process.env.NEXT_PUBLIC_AVAILABILITY?.trim() || 'Monday – Friday, 9am – 6pm'
  const replyTime = process.env.NEXT_PUBLIC_REPLY_TIME?.trim() || 'Replies within one business day'
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <header className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-tight" aria-label={`${companyName} home`}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">{companyName.charAt(0).toUpperCase()}</span>
            {companyName}
          </a>
          <a href={`mailto:${contactEmail}`} className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"><Mail className="size-4" aria-hidden="true" />{contactEmail}</a>
        </header>

        <div id="top" className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-24">
          <section className="max-w-md">
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="size-2 rounded-full bg-primary" aria-hidden="true" />Start a conversation</p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Let&apos;s make something <span className="text-primary">meaningful.</span></h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">Have a question, an idea, or just want to say hello? We&apos;re always happy to hear from thoughtful people.</p>
            <div className="mt-10 grid gap-5 border-t border-border pt-6 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground"><Clock3 className="size-4 text-primary" aria-hidden="true" /><span>{availability}</span></div>
              <div className="flex items-center gap-3 text-muted-foreground"><MessageCircle className="size-4 text-primary" aria-hidden="true" /><span>{replyTime}</span></div>
              {contactPhone && <div className="flex items-center gap-3 text-muted-foreground"><Mail className="size-4 text-primary" aria-hidden="true" /><a href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`} className="hover:text-foreground">{contactPhone}</a></div>}
            </div>
          </section>

          <section aria-labelledby="form-title" className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_80px_-32px_color-mix(in_oklab,var(--primary)_35%,transparent)] sm:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div><h2 id="form-title" className="text-2xl font-semibold tracking-tight">Send us a note</h2><p className="mt-2 text-sm text-muted-foreground">All fields are required.</p></div>
              <ArrowUpRight className="size-5 text-primary" aria-hidden="true" />
            </div>
            <ContactForm contactEmail={contactEmail} />
          </section>
        </div>

        <footer className="flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 {companyName}</span><span>Good work starts with a good question.</span></footer>
      </div>
    </main>
  )
}
