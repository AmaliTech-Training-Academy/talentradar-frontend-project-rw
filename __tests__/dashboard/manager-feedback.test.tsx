import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerFeedBackPage from '@/app/dashboard/manager-feedback/page';

// Mock fetch globally
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    })
  ) as unknown as typeof fetch;
});

// Mock dynamic import (RichTextEditor)
vi.mock('next/dynamic', async () => {
  const Actual = await vi.importActual('next/dynamic');
  return {
    ...(Actual as object),
    default: () => () => <div data-testid="rich-text-editor">RichTextEditor</div>,
  };
});

// Mock child components
vi.mock('@/app/dashboard/manager-feedback/components/user-carousel', () => ({
  default: () => <div data-testid="user-carousel">UserCarousel</div>,
}));
vi.mock('@/app/dashboard/manager-feedback/components/selected-user', () => ({
  default: () => <div data-testid="selected-user">SelectedUser</div>,
}));
vi.mock('@/app/dashboard/manager-feedback/components/manager-confirmation-modal', () => ({
  default: () => <div data-testid="confirmation-modal">ConfirmationModal</div>,
}));

describe('ManagerFeedBackPage', () => {
  it('renders without crashing', async () => {
    render(<ManagerFeedBackPage />);

    // Check for static heading text
    expect(
      await screen.findByText('Manager Performance Evaluation')
    ).toBeInTheDocument();

    // Check for carousel placeholder
    expect(await screen.findByTestId('user-carousel')).toBeInTheDocument();
  });
});
