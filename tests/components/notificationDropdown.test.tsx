import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { vi } from 'vitest';
import { NotificationDropdown } from '@/components/custom/notification-dropdown';

// Mock Next.js Link
vi.mock('next/link', () => ({
    default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
        <a href={href} {...props}>{children}</a>
    ),
}));

// Mock Lucide Icons
vi.mock('lucide-react', () => ({
    Bell: ({ size }: { size: number }) => <div data-testid="bell-icon" data-size={size}>Bell</div>,
    Loader: ({ className, ...props }: { className?: string }) => (
        <div data-testid="loader-icon" className={className} {...props}>Loader</div>
    ),
}));

// Mock dropdown menu with React state management
vi.mock('@/components/ui/dropdown-menu', () => {
    const DropdownMenuRoot = ({ children }: { children: React.ReactNode }) => {
        const [isOpen, setIsOpen] = React.useState(false);
        return React.Children.map(children, (child) =>
            React.isValidElement(child) && typeof child.type === 'function'
                ? React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen })
                : child
        );
    };

    return {
        DropdownMenu: DropdownMenuRoot,
        DropdownMenuTrigger: ({ children, className, setIsOpen }: any) => (
            <button
                data-testid="dropdown-menu-trigger"
                className={className}
                onClick={() => setIsOpen((prev: boolean) => !prev)}
            >
                {children}
            </button>
        ),
        DropdownMenuContent: ({ children, className, align, isOpen }: any) =>
            isOpen ? <div data-testid="dropdown-menu-content" className={className} data-align={align}>{children}</div> : null,
        DropdownMenuGroup: ({ children, className }: any) => <div data-testid="dropdown-menu-group" className={className}>{children}</div>,
        DropdownMenuItem: ({ children, disabled, className }: any) => (
            <div data-testid="dropdown-menu-item" aria-disabled={disabled} className={className}>
                {React.Children.map(children, child =>
                    typeof child === 'string' ? child : React.cloneElement(child as React.ReactElement, {})
                )}
            </div>
        ),
        DropdownMenuLabel: ({ children }: any) => <div data-testid="dropdown-menu-label">{children}</div>,
    };
});

// Mock getRelativeTime
vi.mock('@/lib/get-relative-time', () => ({
    getRelativeTime: (_: string) => '2 hours ago',
}));

// Mock useNotifications hook
type HookReturn = { notifications: any[]; loading: boolean };
const mockUseNotifications = vi.fn<() => HookReturn>();
vi.mock('@/lib/hooks/use-notifications', () => ({
    useNotifications: () => mockUseNotifications(),
}));


beforeEach(() => {
    vi.clearAllMocks();
});

const baseNotification = {
    id: '1',
    title: 'Test Title',
    content: 'Short content',
    sentAt: '2025-07-15T10:00:00Z',
    category: 'INFO',
    eventType: 'OTHER',
};

describe('NotificationDropdown', () => {

    it('renders bell icon and badge count', () => {
        mockUseNotifications.mockReturnValue({ notifications: [], loading: false });
        render(<NotificationDropdown />);
        expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('shows loading state when loading is true', async () => {
        mockUseNotifications.mockReturnValue({ notifications: [], loading: true });
        render(<NotificationDropdown />);
        fireEvent.click(screen.getByTestId('dropdown-menu-trigger'));

        // Wait for dropdown content and verify loading state
        const dropdownContent = await screen.findByTestId('dropdown-menu-content');
        within(dropdownContent).getByTestId('loader-icon');
        within(dropdownContent).getByText(/loading/i);
    });

    it('shows "0 notifications" when all are read', async () => {
        const readNotification = [{ ...baseNotification, readAt: '2025-07-15T11:00:00Z' }];
        mockUseNotifications.mockReturnValue({ notifications: readNotification, loading: false });
        render(<NotificationDropdown />);
        fireEvent.click(screen.getByTestId('dropdown-menu-trigger'));
        expect(await screen.getByText('0 notifications')).toBeInTheDocument();
    });

    it('renders unread notifications after opening', async () => {
        const unread = [
            { ...baseNotification, id: 'a' },
            { ...baseNotification, id: 'b', title: 'Another' },
        ];
        mockUseNotifications.mockReturnValue({ notifications: unread, loading: false });
        render(<NotificationDropdown />);
        fireEvent.click(screen.getByTestId('dropdown-menu-trigger'));

        expect(await screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Another')).toBeInTheDocument();
        expect(screen.getAllByText('2 hours ago')).toHaveLength(2);
    });

    it('truncates long content correctly', async () => {
        const longNotif = {
            ...baseNotification,
            content: 'A'.repeat(100),
            readAt: null,
        };
        mockUseNotifications.mockReturnValue({ notifications: [longNotif], loading: false });
        render(<NotificationDropdown />);
        fireEvent.click(screen.getByTestId('dropdown-menu-trigger'));

        expect(await screen.findByText(/A{40}\.\.\./)).toBeInTheDocument();
    });

    it('renders "See more details" link when there are unread', async () => {
        mockUseNotifications.mockReturnValue({ notifications: [baseNotification], loading: false });
        render(<NotificationDropdown />);
        fireEvent.click(screen.getByTestId('dropdown-menu-trigger'));
        const seeMore = await screen.findByText('See more details');
        expect(seeMore).toBeInTheDocument();
        expect(seeMore.closest('a')).toHaveAttribute('href', '/dashboard/notifications');
    });

    it('badge count matches number of unread notifications', () => {
        const mix = [
            { ...baseNotification, id: 'x', readAt: null },
            { ...baseNotification, id: 'y', readAt: '2025-07-15T12:00:00Z' },
            { ...baseNotification, id: 'z', readAt: null },
        ];
        mockUseNotifications.mockReturnValue({ notifications: mix, loading: false });
        render(<NotificationDropdown />);
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});