# Authentication Integration

The authentication system has been integrated using:
- Zustand for state management
- Axios for API calls
- js-cookie for token management
- React Hot Toast for notifications

## Components

- `AuthProvider`: Context provider that makes auth state available throughout the app
- `useAuth`: Hook to access auth state and methods
- `ProtectedRoute`: Component to wrap protected pages

## Usage

### In any component:

```tsx
import { useAuth } from '@/components/AuthProvider';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login('email@example.com', 'password');
      // User is now logged in
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### For protected routes:

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Protected Content</h1>
        <p>This content is only visible to authenticated users.</p>
      </div>
    </ProtectedRoute>
  );
};
```

## API Functions

Available in `lib/authAPI.ts`:
- `login(email, password)`
- `register(name, email, password)`
- `logout()`
- `forgotPassword(email)`
- `resetPassword(token, newPassword)`
- `changePassword(currentPassword, newPassword)`
- `getProfile()`
- `updateProfile(data)`
- `refreshToken()`

## Store Methods

Available in the auth store:
- `login(email, password)` - Login user
- `register(name, email, password)` - Register new user
- `logout()` - Logout user
- `fetchProfile()` - Fetch current user profile
- `changePassword(currentPassword, newPassword)` - Change user password
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, newPassword)` - Reset password with token
- `refreshToken()` - Refresh access token

## Environment Variables

Make sure to set the following environment variable:
- `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL (defaults to 'http://localhost:3000/api')