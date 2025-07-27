import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { NotificationCard } from '@/app/dashboard/notifications/components/notification-card';
import { INotification } from '@/lib/types/notification';

describe('NotificationCard Component', () => {
  const mockNotification: INotification = {
    id: '1',
    title: 'Test Notification',
    content: 'This is a test notification.',
    category: 'INFO',
    eventType: 'FEEDBACK',
    sentAt: '2025-07-25T10:00:00Z',
  };

  const mockOnCheck = vi.fn();
  const mockOnMarkRead = vi.fn();
  const mockOnDismiss = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the notification details correctly', () => {
    render(
      <NotificationCard
        notification={mockNotification}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification.')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('displays the correct icon based on category', () => {
    render(
      <NotificationCard
        notification={{ ...mockNotification, category: 'SUCCESS' }}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByTestId('icon-success')).toBeInTheDocument();
  });

  it('calls onCheck when the checkbox is clicked', () => {
    render(
      <NotificationCard
        notification={mockNotification}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnCheck).toHaveBeenCalled();
  });

  it('calls onMarkRead when the mark as read button is clicked', () => {
    render(
      <NotificationCard
        notification={mockNotification}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    fireEvent.click(screen.getByTestId('mark-read-button'));
    expect(mockOnMarkRead).toHaveBeenCalled();
  });

  it('calls onDismiss when the dismiss button is clicked', () => {
    render(
      <NotificationCard
        notification={mockNotification}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    fireEvent.click(screen.getByTestId('dismiss-button'));
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  it('displays the unread dot for unread notifications', () => {
    render(
      <NotificationCard
        notification={mockNotification}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByTestId('unread-dot')).toBeInTheDocument();
  });

  it('displays the relative time correctly', () => {
    render(
      <NotificationCard
        notification={mockNotification}
        checked={false}
        onCheck={mockOnCheck}
        onMarkRead={mockOnMarkRead}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });
});
