import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from './AuthLayout';

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(formState.email, formState.password);
      setSuccessMessage('Check your inbox to confirm your email address.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (signUpError) {
      setError(signUpError instanceof Error ? signUpError.message : 'Unable to create account. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Save progress, sync devices, and unlock the full Smart Tourist Assistant experience.">
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
          <label className="text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
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

        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            minLength={6}
            value={formState.confirmPassword}
            onChange={(event) => setFormState((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-amber-700 hover:text-amber-900">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

