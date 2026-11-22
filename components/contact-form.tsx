'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

type FormValues = typeof initialValues
type FormErrors = Partial<Record<keyof FormValues, string>>

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email.'
  }
  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  if (!values.message.trim()) {
    errors.message = 'Please tell us a little more.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please write at least 20 characters.'
  }
  return errors
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
}: {
  id: keyof FormValues
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer h-14 w-full rounded-xl border border-border bg-card px-4 pb-2 pt-6 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 aria-[invalid=true]:border-destructive"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
      </div>
      {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('loading')
    const subject = encodeURIComponent(values.subject)
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    )
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setStatus('success')
    setValues(initialValues)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'success' && (
        <div role="status" className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div><p className="font-medium">Your email app should open.</p><p className="mt-1 opacity-80">Send the prepared message from there. You can also contact us directly at {contactEmail}.</p></div>
        </div>
      )}
      {status === 'error' && <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">Something went wrong. Please try again.</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingField id="name" label="Your name" value={values.name} onChange={(value) => updateField('name', value)} error={errors.name} />
        <FloatingField id="email" label="Email address" type="email" value={values.email} onChange={(value) => updateField('email', value)} error={errors.email} />
      </div>
      <FloatingField id="subject" label="What can we help with?" value={values.subject} onChange={(value) => updateField('subject', value)} error={errors.subject} />
      <div className="space-y-2">
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            placeholder=" "
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="peer min-h-36 w-full resize-y rounded-xl border border-border bg-card px-4 pb-3 pt-7 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 aria-[invalid=true]:border-destructive"
          />
          <label htmlFor="message" className="pointer-events-none absolute left-4 top-5 text-sm text-muted-foreground transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs">Your message</label>
        </div>
        {errors.message && <p id="message-error" className="text-xs text-destructive">{errors.message}</p>}
      </div>
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">We typically reply within one business day.</p>
        <button type="submit" disabled={status === 'loading'} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70">
          {status === 'loading' ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" />Sending...</> : <><Send className="size-4" aria-hidden="true" />Send message</>}
        </button>
      </div>
    </form>
  )
}
