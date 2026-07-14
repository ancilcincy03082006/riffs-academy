import { useEffect, useState } from 'react'
import { FaArrowLeft, FaClipboardList, FaCommentDots, FaEnvelope, FaPhone, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type EnrollmentRecord = {
  id: number
  full_name: string
  email: string
  mobile: string
  course: string
  message: string
  created_at: string
}

type FeedbackRecord = {
  id: number
  full_name: string
  email: string
  course: string
  rating: number
  message: string
  created_at: string
}

export default function AdminPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([])
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin-data')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load admin data')
        }

        setEnrollments(data.inquiries || [])
        setFeedbacks(data.feedbacks || [])
      } catch (error) {
        console.error(error)
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load admin data')
      } finally {
        setIsLoading(false)
      }
    }

    loadAdminData()
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.14),_transparent_28%),linear-gradient(135deg,_#030712,_#111827_65%,_#0f172a)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl sm:p-8">
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
          <FaClipboardList className="text-xl" />
          <span className="text-xs uppercase tracking-[0.35em]">Admin Dashboard</span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Enrollment and feedback records
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
          This page pulls the submitted enrollment details and feedback entries directly from your PostgreSQL database and separates them into two clear sections.
        </p>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            Loading admin records...
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Enrollment</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Student enrollment details</h2>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {enrollments.length} records
                </span>
              </div>

              {enrollments.length === 0 ? (
                <p className="text-sm text-slate-300">No enrollment records are available yet.</p>
              ) : (
                <div className="max-h-[32rem] space-y-3 overflow-auto pr-1">
                  {enrollments.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-white">{item.full_name}</p>
                        <span className="text-xs text-slate-400">{new Date(item.created_at).toLocaleString()}</span>
                      </div>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <p className="flex items-center gap-2"><FaEnvelope className="text-amber-300" /> {item.email}</p>
                        <p className="flex items-center gap-2"><FaPhone className="text-amber-300" /> {item.mobile}</p>
                      </div>

                      <p className="mt-2"><span className="text-amber-300">Course:</span> {item.course || '—'}</p>
                      <p className="mt-2"><span className="text-amber-300">Message:</span> {item.message || '—'}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Feedback</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Student feedback details</h2>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {feedbacks.length} records
                </span>
              </div>

              {feedbacks.length === 0 ? (
                <p className="text-sm text-slate-300">No feedback records are available yet.</p>
              ) : (
                <div className="max-h-[32rem] space-y-3 overflow-auto pr-1">
                  {feedbacks.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-white">{item.full_name}</p>
                        <span className="text-xs text-slate-400">{new Date(item.created_at).toLocaleString()}</span>
                      </div>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <p className="flex items-center gap-2"><FaEnvelope className="text-amber-300" /> {item.email}</p>
                        <p><span className="text-amber-300">Course:</span> {item.course || '—'}</p>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-amber-300">
                        <FaCommentDots />
                        <span className="text-sm text-slate-200">Rating:</span>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }, (_, index) => (
                            <FaStar
                              key={`${item.id}-${index}`}
                              className={index < item.rating ? 'text-amber-300' : 'text-slate-600'}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-3"><span className="text-amber-300">Message:</span> {item.message || '—'}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
