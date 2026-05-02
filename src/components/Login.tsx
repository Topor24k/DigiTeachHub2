import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Direct navigation for demo
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Pane - Image/Branding */}
      <div className="hidden lg:block relative bg-um-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000" 
            alt="Digital Learning" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Website</span>
          </Link>
          
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6">Digital Excellence Starts Here.</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Join the University of Mindanao's central hub for blended learning. Access tasks, collaborate with peers, and build your digital portfolio.
            </p>
          </div>
          
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-um-gold mb-2">Student Access Only</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">© 2026 UM DigiTeach Hub</p>
          </div>
        </div>
        
        {/* Decorative mask */}
        <div className="absolute top-0 right-0 w-32 h-full bg-um-red/10 skew-x-12 translate-x-12" />
      </div>

      {/* Right Pane - Form */}
      <div className="flex items-center justify-center p-8 bg-zinc-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 bg-um-red flex items-center justify-center rounded">
                <span className="text-white font-bold text-xs">DH</span>
              </div>
              <h2 className="text-lg font-bold">DigiTeach Hub</h2>
            </div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-zinc-500">Log in to your student account to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">University Email</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-200 py-3 pl-8 outline-none focus:border-um-red transition-all" 
                  placeholder="student@umindanao.edu.ph"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-200 py-3 pl-8 outline-none focus:border-um-red transition-all" 
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-um-red transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-zinc-300 text-um-red focus:ring-um-red" />
                <label htmlFor="remember" className="text-xs text-zinc-500 font-medium">Remember me</label>
              </div>
              <a href="#" className="text-xs font-bold text-um-red hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-um-red text-white py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-um-black transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-zinc-100">
            <p className="text-xs text-center text-zinc-400">
              Not yet registered? <a href="#" className="text-um-red font-bold">Contact your department</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
