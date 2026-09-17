import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input, GenieMascot } from '../components';
import { useAppStore } from '../store';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, setCurrentPage } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        setError(null);
        await login(email, password);
        setCurrentPage('home');
      } catch (loginError) {
        setError(loginError instanceof Error ? loginError.message : 'Unable to log in');
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left Side - Illustration (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sage to-olive items-center justify-center p-8">
        <div className="text-center">
          <GenieMascot size="lg" />
          <h1 className="heading-1 text-white mt-8 mb-4">Gift Genie</h1>
          <p className="text-white/80 text-lg">Find a gift they'll never forget</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Logo (Mobile) */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-3xl font-bold text-mauve mb-2">✨ Gift Genie</div>
            <p className="text-mauve/70">Find a gift they'll never forget</p>
          </div>

          {/* Form Container */}
          <div className="card">
            <h2 className="heading-2 mb-2 text-center">Welcome back!</h2>
            <p className="text-center text-mauve/70 mb-8">
              Let's find something special.
            </p>
            {error && <p className="mb-4 rounded-xl bg-coral/10 p-3 text-sm text-coral">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <label className="block text-sm font-semibold text-mauve mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mauve/50 hover:text-mauve"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-sm text-mauve">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-coral hover:text-coral/80 font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              <Button variant="primary" className="w-full">
                Log In →
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-olive/30" />
              <span className="text-sm text-mauve/60">or continue with</span>
              <div className="flex-1 h-px bg-olive/30" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full py-3 px-4 border-2 border-olive rounded-xl hover:bg-olive/20 font-semibold text-mauve transition-colors">
                Continue with Google
              </button>
              <button className="w-full py-3 px-4 border-2 border-olive rounded-xl hover:bg-olive/20 font-semibold text-mauve transition-colors">
                Continue with Apple
              </button>
            </div>

            {/* Footer */}
            <p className="text-center mt-6 text-mauve/70">
              New to Gift Genie?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="text-coral font-semibold hover:text-coral/80"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
