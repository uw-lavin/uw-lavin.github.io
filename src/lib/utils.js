/**
 * Combines class names conditionally.
 * Simple replacement for clsx/tailwind-merge until those are added.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
