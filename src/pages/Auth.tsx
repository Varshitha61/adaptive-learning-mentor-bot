
import AuthForm from '@/components/auth/AuthForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is already authenticated
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.isAuthenticated) {
          navigate('/dashboard');
        }
      } catch (error) {
        // Invalid user data in localStorage
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-primary">EduMentor</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Your Adaptive Learning AI Tutor</p>
      </div>
      <AuthForm />
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 max-w-md text-center">
        EduMentor uses advanced AI to personalize your learning journey, adapt to your pace, and provide real-time guidance.
      </p>
    </div>
  );
};

export default Auth;
