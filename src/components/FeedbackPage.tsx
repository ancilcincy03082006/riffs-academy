import { type ChangeEvent, type FormEvent, useState } from 'react'
import { FaArrowLeft, FaCommentDots, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type FeedbackFormState = {
  full_name: string
  email: string
  course: string
  rating: number
  message: string
}

const initialFeedbackForm: FeedbackFormState = {
  full_name: '',
  email: '',
  course: '',
  rating: 5,
  message: '',
}

const ratingOptions = [5, 4, 3, 2, 1]

export default function FeedbackPage() {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackFormState>(initialFeedbackForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    setFeedbackForm((current) => ({
      ...current,
      [name]: name === 'rating' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setFeedbackMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback')
      }

      setStatus('success')
      setFeedbackMessage('Thank you for sharing your feedback with us!')
      setFeedbackForm(initialFeedbackForm)
    } catch (error) {
      setStatus('error')
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to submit feedback')
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.14),_transparent_28%),linear-gradient(135deg,_#030712,_#111827_65%,_#0f172a)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-400/20"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-3 text-amber-300">
          <FaCommentDots className="text-xl" />
          <span className="text-xs uppercase tracking-[0.35em]">Student Feedback</span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Share your experience with Riffs Academy
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Your feedback helps us improve lesson quality, mentor support, and the overall student journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="full_name"
              value={feedbackForm.full_name}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Full Name"
              required
            />
            <input
              name="email"
              type="email"
              value={feedbackForm.email}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Email"
              required
            />
          </div>

          <input
            name="course"
            value={feedbackForm.course}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Course / Class Name"
          />

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <label className="mb-3 block text-sm font-medium text-slate-200">
              Overall experience rating
            </label>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFeedbackForm((current) => ({ ...current, rating: value }))}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    feedbackForm.rating === value
                      ? 'border-amber-300 bg-amber-400/20 text-amber-200'
                      : 'border-white/10 bg-slate-950/40 text-slate-300 hover:border-amber-400/40'
                  }`}
                >
                  <FaStar className="text-amber-300" />
                  {value}
                </button>
              ))}
            </div>
          </div>

          <textarea
            name="message"
            value={feedbackForm.message}
            onChange={handleChange}
            className="min-h-36 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Tell us what worked well and what we can improve"
            required
          />

          <button
            type="submit"
            className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {feedbackMessage && (
            <p
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status === 'success'
                  ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
                  : 'border-rose-400/40 bg-rose-400/10 text-rose-100'
              }`}
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
