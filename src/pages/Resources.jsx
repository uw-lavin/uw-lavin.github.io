import { useState, useEffect } from 'react';

export default function Resources() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = 'lavin2024';

  useEffect(() => {
    const storedAuth = localStorage.getItem('lavinAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('lavinAuth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lavinAuth');
    setPassword('');
  };

  const resources = [
    {
      title: 'Pitch Deck Templates',
      description: 'Professional templates for investor presentations',
      icon: '📊',
      link: '#'
    },
    {
      title: 'Business Model Canvas',
      description: 'Interactive canvas for business planning',
      icon: '🎯',
      link: '#'
    },
    {
      title: 'Mentor Directory',
      description: 'Connect with industry professionals',
      icon: '👥',
      link: '#'
    },
    {
      title: 'Funding Resources',
      description: 'Grants, competitions, and investment opportunities',
      icon: '💰',
      link: '#'
    },
    {
      title: 'Legal Templates',
      description: 'Founder agreements, NDAs, and contracts',
      icon: '⚖️',
      link: '#'
    },
    {
      title: 'Technical Resources',
      description: 'Development tools and cloud credits',
      icon: '💻',
      link: '#'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-10">
        <h1 className="text-4xl font-black text-black mb-8 text-left">Resources</h1>
        <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
          <h2 className="text-2xl font-bold text-black mb-6 text-left">Member Access</h2>
          <p className="text-neutral-700 mb-6 text-left">
            Enter the password to access member-only resources and tools.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Access Resources
            </button>
          </form>
        </div>
      </div>
    );
  }

      return (
      <div className="w-full px-6 md:px-12 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-black">Resources</h1>
        <button
          onClick={handleLogout}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Logout
        </button>
      </div>
      
      <p className="text-lg text-neutral-700 mb-12 text-left">
        Welcome to the member-only resources portal. Access tools, templates, and connections.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200">
            <div className="text-4xl mb-4">{resource.icon}</div>
            <h3 className="text-xl font-bold text-black mb-2">{resource.title}</h3>
            <p className="text-neutral-600 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Access →
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <p className="text-neutral-600">
          Need help accessing any resources? Contact the Lavin team.
        </p>
      </div>
    </div>
  );
} 