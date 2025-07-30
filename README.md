# Lavin Entrepreneurship Program Website

The official website for the Lavin Entrepreneurship Program at the University of Washington. This highly competitive program serves undergraduate entrepreneurs from all majors and disciplines, providing them with the experience, skills, and know-how to succeed in their future business ventures.

## About the Program

The Lavin Entrepreneurship Program is run through the UW Buerk Center for Entrepreneurship and serves as a bridge between academic learning and real-world entrepreneurship. Students benefit from:

- Connections to Seattle's vibrant startup ecosystem
- Access to tech giants, venture capital, and accelerators
- Partnerships with UW CoMotion, Foster School, Techstars, and Madrona Venture Labs
- Alumni network at top companies like Stripe, Meta, and Amazon

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with custom UW branding
- **Animations**: Framer Motion and GSAP
- **Routing**: React Router DOM
- **Calendar**: FullCalendar with iCal integration
- **Additional**: Lenis smooth scrolling, various carousel components

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SpotlightCarousel.jsx
│   ├── UpcomingEvents.jsx
│   └── ...
├── pages/              # Route components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Recruitment.jsx
│   └── ...
├── assets/             # Images and static files
├── hooks/              # Custom React hooks
└── main.jsx           # Application entry point
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Event Calendar**: Integration with iCal for program events
- **Gallery**: Dynamic photo showcases
- **Recruitment Portal**: Application information and resources
- **Member Profiles**: Executive board and program participants

## Contributing

This project is maintained by the Lavin Entrepreneurship Program team. For questions or contributions, please contact the program administrators.

## Legacy

Named after Leonard Lavin, founder of Alberto-Culver Company, this program continues his legacy of innovation and business acumen by inspiring the next generation of entrepreneurs at the University of Washington.
