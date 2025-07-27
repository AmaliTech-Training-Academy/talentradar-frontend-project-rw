import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Notifications from '@/app/dashboard/notifications/page';
import { useNotifications } from '@/lib/hooks/use-notifications';

// Mock useNotifications hook
vi.mock('@/lib/hooks/use-notifications', () => ({
  useNotifications: vi.fn(),
}));

describe('Notifications Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page header and tabs', () => {
    (useNotifications as jest.Mock).mockReturnValue({ notifications: [], loading: false });
    render(<Notifications />);

    // Check header
    expect(screen.getByText('Notification Center')).toBeInTheDocument();
    expect(screen.getByText('0 unread notifications')).toBeInTheDocument();

    // Check tabs
    expect(screen.getByText('all')).toBeInTheDocument();
    expect(screen.getByText('unread')).toBeInTheDocument();
    expect(screen.getByText('info')).toBeInTheDocument();
    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByText('warning')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('shows loading state when loading is true', () => {
    (useNotifications as jest.Mock).mockReturnValue({ notifications: [], loading: true });
    render(<Notifications />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays empty state when there are no notifications', () => {
    (useNotifications as jest.Mock).mockReturnValue({ notifications: [], loading: false });
    render(<Notifications />);

    expect(screen.getByText('0 notifications found.')).toBeInTheDocument();
  });

  it('filters notifications by tab', () => {
    const mockNotifications = [
      { id: '1', title: 'Info Notification', category: 'INFO', readAt: null },
      { id: '2', title: 'Success Notification', category: 'SUCCESS', readAt: '2025-07-15T10:00:00Z' },
    ];
    (useNotifications as jest.Mock).mockReturnValue({ notifications: mockNotifications, loading: false });
    render(<Notifications />);

    // Switch to INFO tab
    fireEvent.click(screen.getByText('info'));
    expect(screen.getByText('Info Notification')).toBeInTheDocument();

    // Switch to SUCCESS tab
    fireEvent.click(screen.getByText('success'));
    expect(screen.getByText('Success Notification')).toBeInTheDocument();
  });

  it('handles mark all as read action', () => {
    const mockMarkAllAsRead = vi.fn();
    (useNotifications as jest.Mock).mockReturnValue({ notifications: [], loading: false, markAllAsRead: mockMarkAllAsRead });
    render(<Notifications />);

    fireEvent.click(screen.getByText('Mark all as read'));
    expect(mockMarkAllAsRead).toHaveBeenCalled();
  });
});
