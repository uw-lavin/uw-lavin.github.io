import { useState } from "react";

const LogoMarquee = () => {
  const token = "pk_XwlDHVwJSTKtCL93vL2R5w";
  const companies = [
    'qualtrics.com',
    'paloaltonetworks.com',
    'milliadagency.com',
    'cascadiacapital.com',
    'amazon.com',
    'accenture.com',
    'snap.com',
    'pitchbook.com',
    'bankofamerica.com',
    'adobe.com',
    'bain.com',
    'google.com',
    'mckinsey.com',
    'tiktok.com',
    'safelite.com',
    'boeing.com',
    'linkedin.com',
    'gopuff.com',
    'tableau.com',
    't-mobile.com',
    'deloitte.com',
    'nike.com',
    'expedia.com',
    'microsoft.com',
    'facebook.com',
    'slalom.com',
    'roku.com',
    'vmware.com',
    'wellsfargo.com',
    'stripe.com',
    'meta.com',
    'openai.com',
    'ycombinator.com'
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative w-full overflow-hidden bg-white border-t border-b border-gray-200 py-4">
      {/* Fade mask left */}
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      {/* Fade mask right */}
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

      {/* Scrolling banner */}
      <div className="scroll-banner flex gap-16 items-center whitespace-nowrap w-max">
        {companies.concat(companies).map((domain, index) => {
          const isHovered = hoveredIndex === index;
          const src = `https://img.logo.dev/${domain}?token=${token}&retina=true&size=80${
            isHovered ? "" : "&greyscale=true"
          }`;

          return (
            <img
              key={index}
              src={src}
              alt={domain}
              className="h-10 object-contain transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              referrerPolicy="no-referrer"
            />
          );
        })}
      </div>
    </div>
  );
};

export default LogoMarquee;