import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input, GenieMascot } from '../components';
import { useAppStore } from '../store';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, setCurrentPage, userMood } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Please enter both your email and password.');
      setResetMessage(null);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setResetMessage(null);
      await login(trimmedEmail, password);
      setCurrentPage('home');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to log in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setResetMessage('Please enter your email first so the genie can send a reset link.');
      setError(null);
      return;
    }

    setResetMessage(`A magic reset link has been sent to ${trimmedEmail}.`);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-cream px-3 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center overflow-hidden rounded-[32px] border border-white/60 bg-white/30 shadow-soft-lg backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden h-full bg-gradient-to-br from-[#dff2e3] via-[#dfe7d5] to-[#fbe5d2] lg:flex lg:items-center lg:justify-center p-8">
          <div className="text-center">
            <GenieMascot size="lg" mood={userMood} />
            <h1 className="heading-1 mt-8 mb-4 text-white drop-shadow-sm">Gift Genie</h1>
            <p className="text-lg text-white/80">Find a gift they’ll never forget</p>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8">
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
              {resetMessage && (
                <p aria-live="polite" className="mb-4 rounded-xl bg-sage/30 p-3 text-sm text-mauve">
                  {resetMessage}
                </p>
              )}

              <form onSubmit={handleLogin} className="space-y-4" noValidate>
                <Input
                  id="login-email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="relative">
                  <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-mauve">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-mauve/50 hover:text-mauve"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded" />
                    <span className="text-sm text-mauve">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-semibold text-coral hover:text-coral/80"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Log In →'}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-olive/30" />
                <span className="text-sm text-mauve/60">or continue with</span>
                <div className="h-px flex-1 bg-olive/30" />
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="w-full rounded-xl border-2 border-olive px-4 py-3 font-semibold text-mauve transition-colors hover:bg-olive/20"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  aria-label="Continue with Apple"
                  className="w-full rounded-xl border-2 border-olive px-4 py-3 font-semibold text-mauve transition-colors hover:bg-olive/20"
                >
                  Continue with Apple
                </button>
              </div>

              {/* Footer */}
              <p className="mt-6 text-center text-mauve/70">
                New to Gift Genie?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('signup')}
                  className="font-semibold text-coral hover:text-coral/80"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
