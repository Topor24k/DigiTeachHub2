import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Target, 
  Cpu, 
  Users, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Globe, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-um-red flex items-center justify-center rounded">
                <span className="text-white font-bold text-xs">DH</span>
              </div>
              <div className="leading-none">
                <h1 className="text-lg font-bold text-um-red">DigiTeach Hub</h1>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">University of Mindanao</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#rationale" className="hover:text-um-red transition-colors">Rationale</a>
              <a href="#goals" className="hover:text-um-red transition-colors">Goals</a>
              <a href="#lessons" className="hover:text-um-red transition-colors">Lessons</a>
              <a href="#innovation" className="hover:text-um-red transition-colors">Innovation</a>
              <a href="#team" className="hover:text-um-red transition-colors">Team</a>
              <Link to="/login" className="px-4 py-2 bg-um-red text-white rounded hover:bg-black transition-all">
                Access Hub
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 p-4 space-y-4"
          >
            <a href="#rationale" className="block py-2" onClick={() => setIsMenuOpen(false)}>Rationale</a>
            <a href="#goals" className="block py-2" onClick={() => setIsMenuOpen(false)}>Goals</a>
            <a href="#lessons" className="block py-2" onClick={() => setIsMenuOpen(false)}>Lessons</a>
            <a href="#innovation" className="block py-2" onClick={() => setIsMenuOpen(false)}>Innovation</a>
            <a href="#team" className="block py-2" onClick={() => setIsMenuOpen(false)}>Team</a>
            <Link to="/login" className="block py-2 font-bold text-um-red" onClick={() => setIsMenuOpen(false)}>Access Hub</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                <Globe size={14} className="text-um-red" />
                <span>Official Hub</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                DigiTeach Hub — <span className="text-um-red">University of Mindanao’s</span> official platform for blended learning
              </h1>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="px-8 py-4 bg-um-red text-white flex items-center gap-2 hover:bg-black transition-all">
                  Get Started <ArrowRight size={20} />
                </Link>
                <a href="#lessons" className="px-8 py-4 border border-zinc-200 hover:bg-zinc-50 transition-all flex items-center gap-2">
                  View Lessons
                </a>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-zinc-100 pt-8">
                <div>
                  <p className="text-3xl font-bold">6-Week</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wide">Intensity</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">8th Grade</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wide">Target Audience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wide">Lessons</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students at UM" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-8 right-8 bg-um-red p-6 text-white text-center">
                  <p className="text-4xl font-bold">100%</p>
                  <p className="text-xs uppercase tracking-widest font-medium">Engagement</p>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-white p-4 shadow-xl border border-zinc-100">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-um-red">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="Teacher" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">University of Mindanao</p>
                    <p className="text-[10px] text-zinc-500 uppercase">Est. 1946</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50 -z-10 skew-x-12 translate-x-1/2" />
      </section>

      {/* Rationale Section */}
      <section id="rationale" className="py-24 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">01 — Rationale</p>
              <h2 className="text-4xl font-bold mb-8">Bridging the Distance through Blended Excellence</h2>
              <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p>
                  UM DigiTeach Hub was developed as the University of Mindanao’s official platform for blended learning. Its primary purpose is to provide a medium where teachers can design and deliver online activities, and students can access, complete, and submit tasks in a centralized space.
                </p>
                <p>
                  By integrating multimedia, interactive tools, and assessment features, the Hub supports flexible teaching and learning, enhances engagement, and ensures that academic activities can continue seamlessly both inside and outside the classroom.
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-4 py-4 px-6 bg-white border border-zinc-100 shadow-sm rounded-lg">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full text-white">
                  <Target size={24} />
                </div>
                <p className="font-medium text-lg">Blended learning environment</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Centralized Space", desc: "Access activities and submit tasks in one unified portal.", icon: <Globe size={24} /> },
                { title: "Multimedia Rich", desc: "Integration of interactive tools and high-quality assets.", icon: <Cpu size={24} /> },
                { title: "Flexible Learning", desc: "Study anytime, anywhere, at your own pace.", icon: <BookOpen size={24} /> },
                { title: "Engagement Focus", desc: "Designed to keep students active and collaborative.", icon: <Users size={24} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 border border-zinc-100 hover:border-um-red transition-all duration-300 group"
                >
                  <div className="mb-4 text-um-red group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section id="goals" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">02 — Our Program Goals</p>
            <h2 className="text-4xl font-bold">Three core objectives driving our mission to transform the educational experience.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border border-zinc-200">
            {[
              { 
                title: "Develop & Implement", 
                desc: "Structured, hands-on training in online teaching strategies, digital content creation, and LMS utilization.",
                number: "01"
              },
              { 
                title: "Measure Competence", 
                desc: "Determine digital teaching competence through validated assessments, performance outputs, and evaluations.",
                number: "02" 
              },
              { 
                title: "Align with Standards", 
                desc: "Ensure alignment with CHED digital learning competencies and UM CTE institutional outcomes.",
                number: "03" 
              }
            ].map((goal, i) => (
              <div key={i} className="p-12 border-b md:border-b-0 md:border-r border-zinc-200 last:border-r-0 hover:bg-zinc-50 transition-colors group">
                <p className="text-5xl font-display font-light text-zinc-200 mb-8 group-hover:text-um-red transition-colors">{goal.number}</p>
                <h3 className="text-xl font-bold mb-4">{goal.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section id="lessons" className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-um-gold font-bold uppercase tracking-[0.2em] mb-4">03 — Learning Lessons</p>
              <h2 className="text-4xl lg:text-5xl font-bold">A structured pathway from initial assessment to academic mastery.</h2>
            </div>
            <Link to="/login" className="flex items-center gap-2 group text-um-gold uppercase tracking-widest text-xs font-bold">
              Begin Journey <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                lesson: "Lesson 1",
                title: "Diagnostic Assessment",
                desc: "Personalized evaluation to identify strengths and learning gaps before starting the journey."
              },
              { 
                lesson: "Lesson 2",
                title: "Digital Content Mastery",
                desc: "Learning to transform traditional lessons into high-engagement interactive formats."
              },
              { 
                lesson: "Lesson 3",
                title: "Main Idea & Supporting Details",
                desc: "Digital Interactive Module focusing on core reading comprehension skills."
              },
              { 
                lesson: "Lesson 4",
                title: "Showcase & Portfolio",
                desc: "Consolidating all learnings into a professional digital portfolio for future use."
              }
            ].map((lesson, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 border border-zinc-800 bg-white/5 flex flex-col h-full hover:border-um-red hover:bg-zinc-800/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-8">
                   <p className="text-xs uppercase tracking-[0.2em] font-bold text-um-gold group-hover:text-um-red transition-colors">{lesson.lesson}</p>
                </div>
                <h3 className="text-xl font-bold mb-4">{lesson.title}</h3>
                <p className="text-sm mb-12 flex-grow text-zinc-400 group-hover:text-zinc-300 transition-colors">{lesson.desc}</p>
                
                <Link to="/login" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-um-gold group-hover:text-um-red transition-colors">
                  Learn more <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <div className="bg-zinc-100 aspect-square rounded-xl flex items-center justify-center p-8">
                     <div className="text-center">
                        <Cpu size={40} className="mx-auto mb-4 text-zinc-400" />
                        <p className="text-xs font-bold uppercase tracking-tighter">Cutting Edge</p>
                     </div>
                   </div>
                   <div className="bg-um-red aspect-[4/5] rounded-xl overflow-hidden p-8 text-white">
                      <ShieldCheck size={32} className="mb-4" />
                      <h4 className="font-bold mb-2">Verified Standards</h4>
                      <p className="text-xs text-white/70">Aligned with CHED and global benchmarks.</p>
                   </div>
                </div>
                <div className="space-y-4 pt-8">
                   <div className="bg-zinc-900 aspect-[4/5] rounded-xl overflow-hidden p-8 text-white">
                      <Target size={32} className="mb-4 text-um-gold" />
                      <h4 className="font-bold mb-2">Phased Framework</h4>
                      <p className="text-xs text-zinc-400">Systematic progression to showcase.</p>
                   </div>
                   <div className="bg-um-gold aspect-square rounded-xl flex items-center justify-center p-8">
                      <div className="text-center text-zinc-900">
                        <Users size={40} className="mx-auto mb-4" />
                        <p className="text-xs font-bold uppercase tracking-tighter">Experiential Approach</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">04 — Innovation</p>
              <h2 className="text-4xl font-bold mb-8">Redefining how we bridge traditional teaching with modern digital excellence.</h2>
              
              <div className="space-y-10">
                {[
                  { title: "Experiential Approach", text: "Immersion through workshops rather than pure theory.", icon: <CheckCircle2 size={20} /> },
                  { title: "Phased Framework", text: "Systematic progression from orientation to showcase.", icon: <CheckCircle2 size={20} /> },
                  { title: "Digital Portfolio", text: "A lasting professional archive of all your outputs.", icon: <CheckCircle2 size={20} /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 text-um-red">{item.icon}</div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-zinc-500 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Development Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-zinc-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-20">
                <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">Professional Development</p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Modern Teacher Training</h2>
                <p className="text-zinc-600 mb-10 leading-relaxed">
                  Our Hub doesn't just provide tools; it transforms how educators approach the digital classroom. Through intensive workshops and collaborative mentorship, we empower teachers to become architects of engaging virtual experiences.
                </p>
                
                <div className="space-y-6">
                  {[
                    "Collaborative Workshops",
                    "Personalized Coaching",
                    "Practical Application"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-um-red" />
                      <p className="font-semibold text-sm uppercase tracking-wide">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80&w=1000" 
                  alt="Teachers in training" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-um-red/10 mix-blend-multiply" />
                <div className="absolute bottom-12 left-12">
                   <div className="bg-white/90 backdrop-blur p-4 rounded shadow-lg border border-white/20">
                      <p className="text-xs font-bold uppercase text-um-red">Teachers in training session</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Table */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">Risk Management</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Proactive strategies ensuring seamless learning.</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-8 py-6 text-left text-sm uppercase tracking-widest font-bold border-r border-zinc-800">Challenge</th>
                  <th className="px-8 py-6 text-left text-sm uppercase tracking-widest font-bold border-r border-zinc-800">Potential Impact</th>
                  <th className="px-8 py-6 text-left text-sm uppercase tracking-widest font-bold">Hub Strategy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { challenge: "Digital Disparity", impact: "Uneven access to hardware", strategy: "Extended laboratory hours" },
                  { challenge: "Internet Stability", impact: "Potential connectivity dips", strategy: "Offline-capable lessons" },
                  { challenge: "Engagement", impact: "Maintaining focus in online tasks", strategy: "Interactive & gamified content" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                    <td className="px-8 py-8 font-bold text-lg border-r border-zinc-100">{row.challenge}</td>
                    <td className="px-8 py-8 text-zinc-500 border-r border-zinc-100">{row.impact}</td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-2 text-um-red font-bold uppercase tracking-wider text-xs">
                        <CheckCircle2 size={16} />
                        {row.strategy}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">05 — Hub Leadership & Mentorship</p>
              <h2 className="text-4xl lg:text-5xl font-bold italic serif-italic text-zinc-500">Verified facilitators, ready to guide</h2>
              <p className="text-zinc-600 mt-6 leading-relaxed">Vetted educators and tech specialists dedicated to the University of Mindanao's digital transformation.</p>
            </div>
          </div>
          
          <div className="marquee-container py-12 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="marquee">
              {[
                { name: "Hershey Nicolle Tabanao", role: "UI/UX Facilitator", img: "/Pictures/Hershey Nicolle N. Tabanao.jpg" },
                { name: "Shuvy Miles Espiritouso", role: "Dev Facilitator", img: "/Pictures/Shuvy Miles C. Espiritouso.jpg" },
                { name: "John Louise Panes", role: "Tech Specialist", img: "/Pictures/John Louise Clark A. Panes.jpg" },
                { name: "Donna Faye Casakit", role: "Design Lead", img: "/Pictures/Donna Faye A. Casakit.jpg" },
                { name: "Richard Jr. Layar", role: "Multimedia Strategist", img: "/Pictures/Richard Jr. R. Layar.jpg" },
                { name: "Reyshil Manibad", role: "Assessment Expert", img: "/Pictures/Reyshil M. Manibad.jpg" },
                { name: "Ruvie Ann C Alba", role: "Mentorship Coordinator", img: "/Pictures/Ruvie Ann C. Alba.jpg" }
              ].map((member, i) => (
                <div key={i} className="marquee-item w-40">
                  <div className="aspect-[3/4] bg-white border border-zinc-200 overflow-hidden group hover:border-um-red transition-all">
                    <div className="w-full h-full bg-zinc-100 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="font-bold text-sm mb-1 line-clamp-2">{member.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold line-clamp-1">{member.role}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: "Hershey Nicolle Tabanao", role: "UI/UX Facilitator", img: "/Pictures/Hershey Nicolle N. Tabanao.jpg" },
                { name: "Shuvy Miles Espiritouso", role: "Dev Facilitator", img: "/Pictures/Shuvy Miles C. Espiritouso.jpg" },
                { name: "John Louise Panes", role: "Tech Specialist", img: "/Pictures/John Louise Clark A. Panes.jpg" },
                { name: "Donna Faye Casakit", role: "Design Lead", img: "/Pictures/Donna Faye A. Casakit.jpg" },
                { name: "Richard Jr. Layar", role: "Multimedia Strategist", img: "/Pictures/Richard Jr. R. Layar.jpg" },
                { name: "Reyshil Manibad", role: "Assessment Expert", img: "/Pictures/Reyshil M. Manibad.jpg" },
                { name: "Ruvie Ann C Alba", role: "Mentorship Coordinator", img: "/Pictures/Ruvie Ann C. Alba.jpg" }
              ].map((member, i) => (
                <div key={`duplicate-${i}`} className="marquee-item w-40">
                  <div className="aspect-[3/4] bg-white border border-zinc-200 overflow-hidden group hover:border-um-red transition-all">
                    <div className="w-full h-full bg-zinc-100 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="font-bold text-sm mb-1 line-clamp-2">{member.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold line-clamp-1">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
             <div>
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2">Trusted by academic boards & agencies Mindanao-wide</p>
                <div className="flex gap-8 opacity-40 grayscale">
                   <div className="font-bold text-2xl">CHED</div>
                   <div className="font-bold text-2xl">UM CTE</div>
                   <div className="font-bold text-2xl">DEPEd</div>
                </div>
             </div>
             <div className="flex gap-12">
                <div className="text-center">
                  <p className="text-4xl font-bold">1,200+</p>
                  <p className="text-xs uppercase font-medium text-zinc-500">Students Mentored</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">100+</p>
                  <p className="text-xs uppercase font-medium text-zinc-500">Modules Deployed</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-um-red font-bold uppercase tracking-[0.2em] mb-4">The Impact</p>
            <h2 className="text-3xl lg:text-4xl font-bold">Expected Outcomes of DigiTeach Hub</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Centralized Hub", desc: "Official platform for all blended learning activities." },
              { title: "Efficient Delivery", desc: "Optimized teaching and lesson delivery systems." },
              { title: "Student Engagement", desc: "Greater involvement in structured online activities." },
              { title: "Seamless Access", desc: "Easy access to lessons and resources anytime." },
              { title: "Streamlined Feedback", desc: "Integrated assessment and rapid feedback process." },
              { title: "Digital Literacy", desc: "Improved tech competence for teachers and students." }
            ].map((outcome, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-xl border border-zinc-100 hover:shadow-xl transition-all">
                <div className="flex-shrink-0 w-10 h-10 bg-um-red/10 text-um-red flex items-center justify-center rounded-lg">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                   <h4 className="font-bold mb-2">{outcome.title}</h4>
                   <p className="text-sm text-zinc-500 leading-relaxed">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection / Contact */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <p className="text-um-gold font-bold uppercase tracking-[0.2em] mb-4">Connection</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-10">Ready to optimize your learning experience?</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg">
                      <Mail size={24} />
                   </div>
                   <div>
                      <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Email Hub</p>
                      <p className="text-xl">digiteach@umindanao.edu.ph</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Location</p>
                      <p className="text-xl">UM CTE Office, Main University Campus</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 text-zinc-900 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Send an Inquiry</h3>
              <form className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Full Name</label>
                  <input type="text" className="w-full border-b border-zinc-200 py-2 outline-none focus:border-um-red transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Student Email</label>
                  <input type="email" className="w-full border-b border-zinc-200 py-2 outline-none focus:border-um-red transition-all" placeholder="john@umindanao.edu.ph" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Your Message</label>
                  <textarea className="w-full border-b border-zinc-200 py-2 outline-none focus:border-um-red transition-all h-32 resize-none" placeholder="How can we help you today?" />
                </div>
                <button type="button" className="w-full bg-um-red text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 transition-colors">
                  Submit Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-um-gold mb-8">Academic Resources</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Belda, J. R., et al. (2025). Bridging the digital gap: An analysis of ICT competence in basic education. JILR.",
                "Commission on Higher Education (CHED). (2022). CMO on flexible learning implementation in HEIs.",
                "Valdez, P. N., et al. (2021). Digital pedagogy and student-centered online lessons. Philippine Journal of Sci. & Ed."
              ].map((ref, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <ExternalLink size={16} className="flex-shrink-0 text-zinc-600 group-hover:text-um-gold transition-colors" />
                  <p className="text-xs text-zinc-400 italic leading-relaxed group-hover:text-white transition-colors">{ref}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-um-red/5 skew-x-12 translate-x-1/4 -z-0" />
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-um-red flex items-center justify-center rounded">
                  <span className="text-white font-bold text-sm">DH</span>
                </div>
                <h1 className="text-xl font-bold uppercase tracking-tight">UM DigiTeach Hub</h1>
              </div>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                Empowering the next generation of learners through structured blended learning environments and digital mentorship.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-zinc-400 mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-um-red">Home</a></li>
                <li><a href="#rationale" className="hover:text-um-red">Rationale</a></li>
                <li><a href="#lessons" className="hover:text-um-red">Lessons</a></li>
                <li><a href="#team" className="hover:text-um-red">Team</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-zinc-400 mb-6">University</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-2"><MapPin size={14} /> Main University Campus</li>
                <li className="flex items-center gap-2">Davao City, Philippines</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-zinc-400">© 2026 UM DigiTeach Hub · University of Mindanao. All rights reserved.</p>
             <div className="flex gap-8 text-xs font-bold text-zinc-400">
                <a href="#" className="hover:text-um-red">Privacy Policy</a>
                <a href="#" className="hover:text-um-red">Terms of Service</a>
                <a href="#" className="hover:text-um-red">Accessibility</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
