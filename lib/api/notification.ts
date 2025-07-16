export const getAllNotifications = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?status=UNREAD&category=ALL`);
        const result = await res.json();
        if (!res.ok) {
            const message = result.message || "An unknown error occurred";
            return { success: false, message };
        }
        return { success: true, result };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknow error occured';
        return { success: false, message };
    }
};