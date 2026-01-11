import { cookies } from 'next/headers';

export const isAuthenticated = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  return !!token;
};

export const getCurrentUser = async() => {
  // In a real implementation, you might decode the JWT token to get user info
  // For now, we'll just check if the token exists
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  
  if (token) {
    // In a real implementation, you would decode the JWT here to get user data
    // For example: return jwt.decode(token);
    return { id: 'temp-id', email: 'temp@example.com' }; // Placeholder
  }
  
  return null;
};