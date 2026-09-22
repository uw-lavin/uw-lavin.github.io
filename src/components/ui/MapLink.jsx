import { resolveLocation } from '../../lib/locations';

/**
 * Renders a venue name. Known campus locations become "Room, Building" linked
 * to the UW interactive map; anything unrecognised renders as plain text.
 */
export default function MapLink({ name, className = '' }) {
  const { label, href } = resolveLocation(name);

  if (!href) return <span className={className}>{label}</span>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={`${label} on the UW campus map`}
      className={`underline decoration-black/30 underline-offset-[3px] hover:decoration-black hover:text-black transition-colors ${className}`}
    >
      {label}
    </a>
  );
}
