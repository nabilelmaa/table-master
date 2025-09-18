# TableMaster

A comprehensive restaurant management system that puts you in control of every table, order, and operation. From managing multiple restaurant locations and staff schedules to tracking reservations and customer reviews, TableMaster provides restaurant owners with the tools they need to deliver exceptional service and maximize profitability across their entire dining empire.

## Features

### 🏪 Restaurant Management
- Multi-location restaurant oversight
- Real-time performance analytics
- Revenue tracking and reporting
- Restaurant status monitoring

### 👥 Staff Management
- Employee scheduling and shift management
- Staff performance tracking
- Role-based access control
- Team communication tools

### 📋 Order Management
- Real-time order tracking
- Kitchen display integration
- Order history and analytics
- Customer order preferences

### ⭐ Review Management
- Customer feedback monitoring
- Review response management
- Rating analytics and trends
- Reputation management tools

### 📅 Reservation System
- Table booking management
- Capacity planning
- Customer preference tracking
- Automated confirmation system

### 📍 Location Management
- Multi-location oversight
- Location-specific analytics
- Regional performance comparison
- Centralized menu management

### ⚙️ Settings & Configuration
- User account management
- System preferences
- Integration settings
- Backup and security options

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter & PT Sans (Google Fonts)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd tablemaster
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
tablemaster/
├── app/
│   ├── dashboard/          # Main dashboard page
│   ├── restaurants/        # Restaurant management
│   ├── staff/             # Staff management
│   ├── orders/            # Order tracking
│   ├── reviews/           # Review management
│   ├── reservations/      # Reservation system
│   ├── locations/         # Location management
│   ├── settings/          # System settings
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (redirects to dashboard)
├── components/
│   ├── restaurant-layout.tsx  # Shared layout with sidebar
│   └── ui/                    # shadcn/ui components
├── public/                    # Static assets
└── README.md
\`\`\`

## Pages Overview

- **Dashboard** (`/dashboard`) - Overview of key metrics and quick actions
- **Restaurants** (`/restaurants`) - Manage restaurant locations and details
- **Staff** (`/staff`) - Employee management and scheduling
- **Orders** (`/orders`) - Real-time order tracking and management
- **Reviews** (`/reviews`) - Customer feedback and review management
- **Reservations** (`/reservations`) - Table booking and reservation system
- **Locations** (`/locations`) - Multi-location management and analytics
- **Settings** (`/settings`) - System configuration and user preferences

## Responsive Design

TableMaster is built with a mobile-first approach and is fully responsive across all devices:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)
- Large screens (1280px+)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.
