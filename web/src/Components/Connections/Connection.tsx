import { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Assurez-vous que le chemin est correct

interface ConnectionProps {
  onSwitchToCreateAccount: () => void;
  onSwitchToHome: () => void;
}

export default function Connection({ onSwitchToCreateAccount, onSwitchToHome }: ConnectionProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // État pour les erreurs
  const [loading, setLoading] = useState(false); // État pour le chargement

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Commence le chargement
    setError(null); // Réinitialise les erreurs

    if (email && password) {
      // Effectue la requête de connexion
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false); // Arrête le chargement

      if (error) {
        setError(error.message); // Affiche l'erreur si elle existe
      } else {
        onSwitchToHome(); // Redirige vers la page d'accueil en cas de succès
      }
    } else {
      setLoading(false); // Arrête le chargement si les champs sont vides
      alert('Please fill in both email and password.');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <button
                  type="submit"
                  disabled={loading} // Désactive le bouton lors du chargement
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Logging in...' : 'Log In'} {/* Affiche un message de chargement */}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>} {/* Affiche les erreurs */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToCreateAccount}
                    className="text-blue-600 hover:underline"
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}