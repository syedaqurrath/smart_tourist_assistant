import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from './AuthLayout';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(formState.email, formState.password);
      navigate(from, { replace: true });
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Unable to sign in. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Sign in to your account" subtitle="Access your personalized Smart Tourist Assistant dashboard.">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <span className="text-xs text-gray-400">min 6 characters</span>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
            value={formState.password}
            onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-semibold text-amber-700 hover:text-amber-900">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

