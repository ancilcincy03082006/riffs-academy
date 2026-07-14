import { type ReactElement, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  FaBook,
  FaCertificate,
  FaChevronUp,
  FaClock,
  FaEnvelope,
  FaGlobe,
  FaLaptop,
  FaMapMarkerAlt,
  FaMicrophoneAlt,
  FaMusic,
  FaPhone,
  FaSearch,
  FaTrophy,
  FaUsers,
  FaWhatsapp,
} from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import FeedbackPage from './components/FeedbackPage'
import './App.css'

type ThemeMode = 'light' | 'dark'

type Course = {
  title: string
  duration: string
  level: string
  age: string
  instructor: string
  highlights: string[]
  icon: ReactElement
  category: string
}

type Faculty = {
  name: string
  instrument: string
  experience: string
  qualifications: string
  image: string
}

type GalleryImage = {
  src: string
  title: string
  category: string
}

const courses: Course[] = [
  {
    title: 'Piano',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Subash',
    highlights: ['Technique', 'Sight reading', 'Performance labs'],
    icon: <FaMusic className="text-2xl" />,
    category: 'Instrument',
  },
  {
    title: 'Keyboard',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Subash',
    highlights: ['Chord progressions', 'Keyboard confidence', 'Stage repertoire'],
    icon: <FaMusic className="text-2xl" />,
    category: 'Instrument',
  },
  {
    title: 'Guitar',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Bibin Raj',
    highlights: ['Fingerstyle', 'Chord mastery', 'Live jam sessions'],
    icon: <FaMusic className="text-2xl" />,
    category: 'Instrument',
  },
  {
    title: 'Violin',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Joel',
    highlights: ['Bow control', 'Expression', 'Concert repertoire'],
    icon: <FaMusic className="text-2xl" />,
    category: 'Instrument',
  },
  {
    title: 'Drums',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Bibin Raj',
    highlights: ['Groove', 'Rhythmic reading', 'Band drills'],
    icon: <FaMusic className="text-2xl" />,
    category: 'Instrument',
  },
  {
    title: 'Vocals',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Joel',
    highlights: ['Breath control', 'Stage presence', 'Recording'],
    icon: <FaMicrophoneAlt className="text-2xl" />,
    category: 'Voice',
  },
  {
    title: 'Music Theory',
    duration: 'Performance-based duration',
    level: 'Beginner to Advanced',
    age: 'All Age',
    instructor: 'Mr. Bibin Raj',
    highlights: ['Harmony', 'Ear training', 'Composition'],
    icon: <FaBook className="text-2xl" />,
    category: 'Theory',
  },
]

const faculty: Faculty[] = [
  {
    name: 'Mr. Bibin Raj',
    instrument: 'Keyboard • Guitar • Violin • Drums',
    experience: '20+ Years of Experience',
    qualifications: 'Certified by Trinity College London',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Mr. Joel',
    instrument: 'Keyboard • Guitar • Violin • Drums',
    experience: '20+ Years of Experience',
    qualifications: 'Certified by Trinity College London',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Mr. Subash',
    instrument: 'Keyboard • Guitar • Violin • Drums',
    experience: '20+ Years of Experience',
    qualifications: 'Certified by Trinity College London',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  },
]

const gallery: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80', title: 'Stage performance', category: 'Performances' },
  { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80', title: 'Studio session', category: 'Studio Sessions' },
  { src: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=900&q=80', title: 'Workshop room', category: 'Workshops' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80', title: 'Competition podium', category: 'Competitions' },
  { src: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=900&q=80', title: 'Summer recital', category: 'Recitals' },
  { src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80', title: 'Masterclass', category: 'Masterclasses' },
]

const features = [
  { title: 'Certified Faculty', icon: <FaCertificate className="text-xl" /> },
  { title: 'Individual Attention', icon: <FaUsers className="text-xl" /> },
  { title: 'Flexible Timings', icon: <FaClock className="text-xl" /> },
  { title: 'International Curriculum', icon: <FaGlobe className="text-xl" /> },
  { title: 'Live Performances', icon: <FaMicrophoneAlt className="text-xl" /> },
  { title: 'Recording Studio Access', icon: <FaLaptop className="text-xl" /> },
]

const faqItems = [
  { question: 'Do you offer trial classes?', answer: 'Yes, we offer a complimentary demo session to help families experience the academy before enrolling.' },
  { question: 'What is the age limit?', answer: 'We welcome learners from age 5 to adults, with lessons tailored to the student’s stage and goals.' },
  { question: 'Do you provide online classes?', answer: 'Our academy offers hybrid learning with live online sessions, recorded feedback, and studio support.' },
  { question: 'Are certifications offered?', answer: 'Students can earn performance certificates, exam preparation support, and annual showcase credentials.' },
]

const blogPosts = [
  { title: 'Benefits of Learning Music', excerpt: 'Why a disciplined music practice can sharpen focus, memory, and confidence.', category: 'Lifestyle' },
  { title: 'Beginner Guitar Guide', excerpt: 'Simple steps to build strength, rhythm, and confidence on the guitar.', category: 'Instrument' },
  { title: 'Piano Practice Tips', excerpt: 'Create a routine that keeps your technique refined and your performance polished.', category: 'Technique' },
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [contactForm, setContactForm] = useState({
    full_name: '',
    email: '',
    mobile: '',
    course: '',
    message: '',
  })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme') as ThemeMode | null
    const initialTheme = savedTheme ?? 'dark'
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send inquiry')
      }

      alert('Inquiry sent successfully!')
      setContactForm({
        full_name: '',
        email: '',
        mobile: '',
        course: '',
        message: '',
      })
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Failed to send inquiry')
    }
  }

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesFilter = filter === 'All' || course.category === filter
      const needle = search.toLowerCase()
      const haystack = `${course.title} ${course.instructor} ${course.category}`.toLowerCase()
      return matchesFilter && haystack.includes(needle)
    })
  }, [filter, search])

  const isLightTheme = theme === 'light'

  return (
    <BrowserRouter>
      <div
        style={{
          filter: isLightTheme ? 'invert(1) hue-rotate(180deg)' : 'none',
          transition: 'filter 0.25s ease-in-out',
        }}
      >
        <Routes>
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/"
            element={(
              <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_28%),linear-gradient(135deg,_#030712,_#111827_65%,_#0f172a)] text-slate-100 transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_28%),linear-gradient(135deg,_#030712,_#111827_65%,_#0f172a)]">
                <motion.div className="fixed top-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-amber-400 via-gold-300 to-amber-200 z-[60]" style={{ scaleX }} />

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/95"
                    >
                      <div className="text-center">
                        <div className="mb-4 h-14 w-14 animate-spin rounded-full border-4 border-amber-400/30 border-t-amber-400" />
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Preparing your experience</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
                  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <a href="#home" className="flex items-center gap-3 text-lg font-semibold tracking-[0.25em] text-amber-100">
                      <span className="rounded-full border border-amber-400/40 bg-amber-400/10 p-2"><FaMusic /></span>
                      <span className="hidden sm:inline">Riffs Academy of Music</span>
                    </a>
                    <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
                      {['Home', 'About', 'Courses', 'Faculty', 'Gallery', 'Achievements', 'Blog', 'FAQ', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-amber-300">
                          {item}
                        </a>
                      ))}
                      <Link to="/feedback" className="transition hover:text-amber-300">Feedback</Link>
                      <Link to="/admin" className="transition hover:text-amber-300">Admin</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                      <a href="#contact" className="rounded-full border border-amber-400/40 bg-amber-400/15 px-4 py-2 text-sm font-medium text-amber-100 transition hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                        Enroll
                      </a>
                      <button onClick={() => setMenuOpen((prev) => !prev)} className="rounded-full border border-white/15 bg-white/10 p-2 text-slate-100 lg:hidden" aria-label="Toggle navigation">
                        {menuOpen ? <FiX /> : <FiMenu />}
                      </button>
                    </div>
                  </div>
                  {menuOpen && (
                    <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
                      <div className="flex flex-col gap-3 text-sm text-slate-300">
                        {['Home', 'About', 'Courses', 'Faculty', 'Gallery', 'Achievements', 'Blog', 'FAQ', 'Contact'].map((item) => (
                          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="transition hover:text-amber-300">
                            {item}
                          </a>
                        ))}
                        <Link to="/feedback" onClick={() => setMenuOpen(false)} className="transition hover:text-amber-300">Feedback</Link>
                        <Link to="/admin" onClick={() => setMenuOpen(false)} className="transition hover:text-amber-300">Admin</Link>
                      </div>
                    </div>
                  )}
                </header>

                <main id="home">
                  <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="hero-bg absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/20" />
                    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
                        <p className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-amber-200">Premium Music Academy</p>
                        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
                          Discover Your Musical Journey with Riffs Academy of Music
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
                          Where Passion Meets Performance. Learn from experienced musicians and transform your talent into excellence.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                          <a href="#contact" className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]">
                            Enroll Now
                          </a>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                          <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">50+ students</span>
                          <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">20+ mentors</span>
                          <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">20+ Years of Excellence</span>
                        </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="glass-card rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                        <img
                          src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80"
                          alt="Students performing music together"
                          loading="lazy"
                          className="h-[420px] w-full rounded-[1.5rem] object-cover"
                        />
                        <div className="mt-4 rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3">
                          <p className="text-sm text-slate-300">Now accepting</p>
                          <p className="font-semibold text-white">Autumn intakes open</p>
                        </div>
                      </motion.div>
                    </div>
                  </section>

                  <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="glass-card rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">
                          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">About Riffs</p>
                          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A heritage of expressive <span className="text-amber-300">music education</span>.</h2>
                          <p className="mt-5 text-slate-300">Riffs Academy of Music was founded to bring world-class training, authentic artistry, and confidence-building instruction to passionate students from all over the world. We blend tradition with modern performance culture.</p>
                          <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                              <h3 className="text-lg font-semibold text-white">Vision</h3>
                              <p className="mt-2 text-sm text-slate-300">To nurture artists who lead with creativity and discipline.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                              <h3 className="text-lg font-semibold text-white">Mission</h3>
                              <p className="mt-2 text-sm text-slate-300">To transform talent into excellence through expert mentorship and immersive practice.</p>
                            </div>
                          </div>
                        </motion.div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          {[
                            { label: '50+ Students', value: '50+' },
                            { label: '50+ Professional Performances', value: '50+' },
                            { label: '20+ Expert Mentors', value: '20+' },
                            { label: '20+ Years of Excellence', value: '20+' },
                          ].map((item, index) => (
                            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.1 }} className="glass-card rounded-[1.5rem] border border-white/10 bg-white/10 p-6 text-center backdrop-blur-xl">
                              <p className="text-4xl font-semibold text-amber-300">{item.value}</p>
                              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-300">{item.label}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="courses" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Courses</p>
                          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Choose a path that matches your passion.</h2>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
                            <FaSearch />
                            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses" className="w-36 bg-transparent outline-none placeholder:text-slate-500" />
                          </label>
                          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 outline-none">
                            <option value="All">All categories</option>
                            <option value="Instrument">Instrument</option>
                            <option value="Theory">Theory</option>
                            <option value="Voice">Voice</option>
                            <option value="Performance">Performance</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredCourses.map((course, index) => (
                          <motion.article key={course.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.05 }} className="glass-card rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-300">{course.icon}</div>
                              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">{course.category}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white">{course.title}</h3>
                            <div className="mt-4 space-y-3 text-sm text-slate-300">
                              <p><span className="text-amber-300">Duration:</span> {course.duration}</p>
                              <p><span className="text-amber-300">Skill Level:</span> {course.level}</p>
                              <p><span className="text-amber-300">Age Group:</span> {course.age}</p>
                              <p><span className="text-amber-300">Instructor:</span> {course.instructor}</p>
                            </div>
                            <ul className="mt-5 space-y-2 text-sm text-slate-300">
                              {course.highlights.map((highlight) => <li key={highlight} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-300" />{highlight}</li>)}
                            </ul>
                            <a href="#contact" className="mt-6 inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-400/20">Enroll Now</a>
                          </motion.article>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="whychooseus" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                      <div className="mb-10 max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Why Choose Us</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">An experience shaped for serious students and thriving artists.</h2>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {features.map((feature, index) => (
                          <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }} className="glass-card rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                            <div className="mb-4 inline-flex rounded-2xl bg-amber-400/15 p-3 text-amber-300">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                            <p className="mt-2 text-sm text-slate-300">Designed for focused learning, confident performances, and an elevated artistic journey.</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="faculty" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                      <div className="mb-10 max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Mentors</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Meet the artists guiding every performance journey.</h2>
                      </div>
                      <div className="grid gap-6 md:grid-cols-3">
                        {faculty.map((person, index) => (
                          <motion.article key={person.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className="glass-card rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-amber-400/40">
                            <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                            <p className="mt-2 text-sm text-amber-300">{person.instrument}</p>
                            <p className="mt-3 text-sm text-slate-300">{person.experience}</p>
                            <p className="mt-2 text-sm text-slate-400">{person.qualifications}</p>
                            <div className="mt-4 flex gap-3 text-lg text-slate-300">
                              <span className="rounded-full border border-white/10 bg-white/10 p-2">♫</span>
                              <span className="rounded-full border border-white/10 bg-white/10 p-2">▶</span>
                              <span className="rounded-full border border-white/10 bg-white/10 p-2">✉</span>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="achievements" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
                      <div className="mb-10 max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Achievements</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Awards, certificates, and unforgettable milestones.</h2>
                      </div>
                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                          {[
                            'National music competition finalists',
                            'Annual recital certificates',
                            'Top exam results in theory and performance',
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-slate-200">
                              <span className="rounded-full bg-amber-400/15 p-2 text-amber-300"><FaTrophy /></span>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-amber-400/15 to-slate-800 p-6">
                          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Highlights</p>
                          <p className="mt-4 text-2xl font-semibold text-white">Students regularly perform at festivals, masterclasses, and professional showcases.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="gallery" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                      <div className="mb-10 max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Gallery</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Moments of learning, performance, and growth.</h2>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {gallery.map((item) => (
                          <button key={item.title} onClick={() => setSelectedImage(item)} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/70 text-left">
                            <img src={item.src} alt={item.title} loading="lazy" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                            <div className="p-4">
                              <p className="text-sm text-amber-300">{item.category}</p>
                              <p className="mt-1 text-lg font-semibold text-white">{item.title}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <AnimatePresence>
                      {selectedImage && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-4" onClick={() => setSelectedImage(null)}>
                          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900" onClick={(event) => event.stopPropagation()}>
                            <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[70vh] w-full object-cover" />
                            <button onClick={() => setSelectedImage(null)} className="absolute right-4 top-4 rounded-full bg-slate-950/70 p-2 text-white">✕</button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  <section id="blog" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                      <div className="mb-10 max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Blog</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Read insights from the academy’s artists and educators.</h2>
                      </div>
                      <div className="grid gap-6 md:grid-cols-3">
                        {blogPosts.map((post) => (
                          <article key={post.title} className="glass-card rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
                            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{post.category}</p>
                            <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
                            <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
                            <a href="#contact" className="mt-6 inline-flex text-sm font-medium text-amber-200">Read more →</a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
                      <div className="mb-10 max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">FAQ</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Questions answered before you begin.</h2>
                      </div>
                      <div className="space-y-4">
                        {faqItems.map((item) => (
                          <div key={item.question} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                            <p className="font-medium text-white">{item.question}</p>
                            <p className="mt-3 text-sm text-slate-300">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
                      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Contact</p>
                          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Let’s begin your next performance chapter.</h2>
                          <div className="mt-6 space-y-4 text-sm text-slate-300">
                            <p className="flex items-center gap-3"><FaPhone className="text-amber-300" /> 8939488123</p>
                            <p className="flex items-center gap-3"><FaWhatsapp className="text-amber-300" /> 8939488123</p>
                            <p className="flex items-center gap-3"><FaEnvelope className="text-amber-300" /> <a href="mailto:bibinriffs2021@gmail.com" className="text-amber-200 underline">bibinriffs2021@gmail.com</a></p>
                            <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-amber-300" /> 1737, TNHB Rd, Rajammal Nagar, Opp. Mayuri Kids Pre-School, TNHB Colony, Annanur, Ayappakam, Chennai, Tamil Nadu - 600077</p>
                            <p className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-slate-200">Working Hours: Monday - Friday • 5:30 PM - 9:30 PM</p>
                          </div>
                          <iframe title="academy-map" src="https://www.google.com/maps?q=1737,%20TNHB%20Rd,%20Rajammal%20Nagar,%20Opp.%20Mayuri%20Kids%20Pre-School,%20TNHB%20Colony,%20Annanur,%20Ayappakam,%20Chennai,%20Tamil%20Nadu%20-%20600077&output=embed" className="mt-6 h-60 w-full rounded-[1.25rem] border-0" loading="lazy" />
                        </div>
                        <form className="space-y-4" onSubmit={handleContactSubmit}>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input
                              name="full_name"
                              value={contactForm.full_name}
                              onChange={handleContactChange}
                              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                              placeholder="Full Name"
                            />
                            <input
                              name="email"
                              type="email"
                              value={contactForm.email}
                              onChange={handleContactChange}
                              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                              placeholder="Email"
                            />
                          </div>
                          <input
                            name="mobile"
                            value={contactForm.mobile}
                            onChange={handleContactChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                            placeholder="Mobile Number"
                          />
                          <input
                            name="course"
                            value={contactForm.course}
                            onChange={handleContactChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                            placeholder="Course Interested In"
                          />
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactChange}
                            className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                            placeholder="Message"
                          />
                          <button type="submit" className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]">Send Inquiry</button>
                        </form>
                      </div>
                    </div>
                  </section>
                </main>

                <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
                  <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-white">Riffs Academy of Music</p>
                      <p className="mt-3 max-w-md text-sm text-slate-400">A premium destination for musical growth, performance confidence, and artistic excellence.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Quick Links</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-400">
                          <li><a href="#about" className="hover:text-white">About</a></li>
                          <li><a href="#courses" className="hover:text-white">Courses</a></li>
                          <li><a href="#contact" className="hover:text-white">Contact</a></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Courses</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-400">
                          <li>Piano</li>
                          <li>Guitar</li>
                          <li>Vocals</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Social</p>
                        <div className="mt-3 flex gap-3 text-lg text-slate-300">
                          <a href="#" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:text-amber-300">♫</a>
                          <a href="#" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:text-amber-300">▶</a>
                          <a href="#" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:text-amber-300">✉</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>

                <a href="#home" className={`fixed bottom-6 right-6 z-50 rounded-full bg-amber-400 p-4 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition ${showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`} aria-label="Scroll to top">
                  <FaChevronUp />
                </a>
              </div>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
