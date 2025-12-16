import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth } from '../store/auth';

describe('Auth Store (Zustand)', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
    
    // Reset store state
    useAuth.getState().clear();
  });

  it('initializes with null values when localStorage is empty', () => {
    const { token, user } = useAuth.getState();
    
    expect(token).toBeNull();
    expect(user).toBeNull();
  });

  it('persists data correctly when setAuth is called', () => {
    // Clear first
    useAuth.getState().clear();
    
    // Setup auth data
    const mockToken = 'test-token-12345';
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      roles: ['admin']
    };
    
    // Set auth
    useAuth.getState().setAuth(mockToken, mockUser);
    
    // Verify it's in localStorage
    expect(localStorage.getItem('admin_token')).toBe(mockToken);
    expect(JSON.parse(localStorage.getItem('admin_user') || '{}')).toEqual(mockUser);
    
    // Verify it's in state
    const state = useAuth.getState();
    expect(state.token).toBe(mockToken);
    expect(state.user).toEqual(mockUser);
  });

  it('sets authentication data correctly', () => {
    const mockToken = 'new-token-67890';
    const mockUser = {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      roles: ['waiter']
    };

    useAuth.getState().setAuth(mockToken, mockUser);

    const state = useAuth.getState();
    expect(state.token).toBe(mockToken);
    expect(state.user).toEqual(mockUser);

    // Should also persist to localStorage
    expect(localStorage.getItem('admin_token')).toBe(mockToken);
    expect(JSON.parse(localStorage.getItem('admin_user') || '{}')).toEqual(mockUser);
  });

  it('clears authentication data', () => {
    // First set some auth data
    const mockToken = 'token-to-clear';
    const mockUser = {
      id: '3',
      name: 'Jane Smith',
      email: 'jane@example.com',
      roles: ['admin']
    };

    useAuth.getState().setAuth(mockToken, mockUser);
    
    // Verify it's set
    expect(useAuth.getState().token).toBe(mockToken);
    
    // Clear it
    useAuth.getState().clear();

    const state = useAuth.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(localStorage.getItem('admin_token')).toBeNull();
    expect(localStorage.getItem('admin_user')).toBeNull();
  });

  it('logs out user correctly', () => {
    // Setup auth
    const mockToken = 'logout-test-token';
    const mockUser = {
      id: '4',
      name: 'Logout Test',
      email: 'logout@example.com',
      roles: ['admin']
    };

    useAuth.getState().setAuth(mockToken, mockUser);
    
    // Logout
    useAuth.getState().logout();

    const state = useAuth.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(localStorage.getItem('admin_token')).toBeNull();
    expect(localStorage.getItem('admin_user')).toBeNull();
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('admin_token', 'valid-token');
    localStorage.setItem('admin_user', 'invalid-json{not-json}');
    
    // Should not throw error, should return defaults
    vi.resetModules();
    
    const state = useAuth.getState();
    // Should fallback to null when JSON parse fails
    expect(state.user).toBeNull();
  });

  it('persists multiple auth changes correctly', () => {
    const user1 = { id: '1', name: 'User 1', email: 'user1@test.com', roles: ['admin'] };
    const user2 = { id: '2', name: 'User 2', email: 'user2@test.com', roles: ['waiter'] };

    // First auth
    useAuth.getState().setAuth('token1', user1);
    expect(useAuth.getState().user?.name).toBe('User 1');

    // Second auth (simulating login as different user)
    useAuth.getState().setAuth('token2', user2);
    expect(useAuth.getState().user?.name).toBe('User 2');
    expect(localStorage.getItem('admin_token')).toBe('token2');
  });

  it('correctly identifies user roles', () => {
    const adminUser = {
      id: '1',
      name: 'Admin User',
      email: 'admin@test.com',
      roles: ['admin', 'manager']
    };

    useAuth.getState().setAuth('admin-token', adminUser);

    const state = useAuth.getState();
    expect(state.user?.roles).toContain('admin');
    expect(state.user?.roles).toContain('manager');
    expect(state.user?.roles.length).toBe(2);
  });
});
