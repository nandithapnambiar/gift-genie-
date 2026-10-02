import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input, GenieMascot } from '../components';
import { useAppStore } from '../store';

export const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, setCurrentPage, userMood } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError(null);
      await signup(fullName, email, password);
      setCurrentPage('onboarding');
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : 'Unable to create account');
    }
  };

  return (
    <div className="min-h-screen bg-cream px-3 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center overflow-hidden rounded-[32px] border border-white/60 bg-white/30 shadow-soft-lg backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden h-full bg-gradient-to-br from-[#f9d0d6] via-[#dff2e3] to-[#dfe7d5] lg:flex lg:items-center lg:justify-center p-8">
          <div className="text-center">
            <GenieMascot size="lg" variant="celebrating" mood={userMood} />
            <h1 className="heading-1 mt-8 mb-4 text-white drop-shadow-sm">Let’s find some magic ✨</h1>
            <p className="text-lg text-white/80">Create your account and start your gifting journey</p>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            {/* Logo (Mobile) */}
            <div className="lg:hidden text-center mb-8">
              <div className="text-3xl font-bold text-mauve mb-2">✨ Gift Genie</div>
              <p className="text-mauve/70">Create your account</p>
            </div>

            {/* Form Container */}
            <div className="card">
              <h2 className="heading-2 mb-2 text-center">Let's find some magic ✨</h2>
              <p className="text-center text-mauve/70 mb-8">
                Create your account and start your gifting journey.
              </p>
              {error && <p className="mb-4 rounded-xl bg-coral/10 p-3 text-sm text-coral">{error}</p>}

              <form onSubmit={handleSignUp} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
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

                <div className="relative">
                  <label className="block text-sm font-semibold text-mauve mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-mauve/50 hover:text-mauve"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="primary" className="w-full mt-6">
                  Create Account →
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-olive/30" />
                <span className="text-sm text-mauve/60">or continue with</span>
                <div className="flex-1 h-px bg-olive/30" />
              </div>

              {/* Social Signup */}
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
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('login')}
                  className="text-coral font-semibold hover:text-coral/80"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
