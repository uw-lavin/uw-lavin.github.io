export function formatDate(date) {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(dateObj);
}

export function formatTime(start, end) {
    if (!start) return null;

    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    // Check if it's an all-day event
    const isAllDay = startDate.getHours() === 0 && startDate.getMinutes() === 0;

    if (isAllDay) {
        return 'All Day';
    }

    // Format time range
    const startTime = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    if (endDate) {
        const endTime = endDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return `${startTime} - ${endTime}`;
    }

    return startTime;
}
