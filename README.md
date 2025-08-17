# Service Marketplace Web

A modern, responsive React web application for the Service Marketplace platform. This application provides customers and service providers with an intuitive web-based interface for service discovery, booking, provider management, and payment processing.

## 🚀 Features

- **Service Discovery**: Browse and search for various services with advanced filtering
- **User Management**: Customer and service provider registration and authentication
- **Booking System**: Seamless service booking with real-time availability
- **Payment Processing**: Secure payment integration for service transactions
- **Provider Dashboard**: Comprehensive dashboard for service providers to manage their offerings
- **Customer Portal**: User-friendly interface for customers to track bookings and payments
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live notifications and status updates

## 🛠 Tech Stack

- **Framework**: [Next.js 15.4.6](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime**: React 19.1.0
- **Build Tool**: Turbopack (for development)
- **Fonts**: Geist Sans & Geist Mono
- **Linting**: ESLint with Next.js configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.17 or later
- **npm**: 9.0 or later (or yarn/pnpm/bun)
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd serviceMarketPlace/service-marketplace-web
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database (if applicable)
DATABASE_URL=your-database-url

# Payment Gateway
STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret

# Other configurations...
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
service-marketplace-web/
├── public/                 # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/               # Next.js App Router
│       ├── favicon.ico
│       ├── globals.css    # Global styles
│       ├── layout.tsx     # Root layout
│       └── page.tsx       # Home page
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## 🛠 Available Scripts

- **`npm run dev`**: Start development server with Turbopack
- **`npm run build`**: Build the application for production
- **`npm run start`**: Start the production server
- **`npm run lint`**: Run ESLint for code quality checks

## 🎨 Styling

This project uses **Tailwind CSS 4** for styling with the following configuration:

- **Fonts**: Geist Sans (primary) and Geist Mono (monospace)
- **Design System**: Utility-first CSS framework
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Built-in dark mode support

## 🔧 Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for consistent formatting
- Follow component-based architecture
- Implement proper error boundaries
- Use semantic HTML elements

### Performance

- Optimize images using Next.js Image component
- Implement code splitting and lazy loading
- Use React.memo() for expensive components
- Optimize bundle size with proper imports

### Accessibility

- Follow WCAG 2.1 guidelines
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Provide alternative text for images

## 📱 Responsive Design

The application is optimized for:

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🚢 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a Git repository
2. Import your project on Vercel
3. Configure environment variables
4. Deploy automatically

### Other Deployment Options

- **Docker**: Containerized deployment
- **AWS**: Deploy using AWS Amplify or EC2
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment

## 🔐 Environment Variables

| Variable                 | Description                | Required |
| ------------------------ | -------------------------- | -------- |
| `NEXT_PUBLIC_API_URL`    | Backend API base URL       | Yes      |
| `NEXT_PUBLIC_APP_URL`    | Frontend application URL   | Yes      |
| `NEXTAUTH_SECRET`        | Authentication secret key  | Yes      |
| `DATABASE_URL`           | Database connection string | No       |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key          | No       |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. Ensure all tests pass
2. Follow the code style guidelines
3. Update documentation if needed
4. Test on multiple devices and browsers

## 📚 Learn More

To learn more about the technologies used:

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API
- **[React Documentation](https://react.dev/)** - Learn React concepts and patterns
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript language reference

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in package.json or kill the process
2. **Module not found**: Clear node_modules and reinstall dependencies
3. **TypeScript errors**: Check tsconfig.json configuration
4. **Styling issues**: Verify Tailwind CSS configuration

### Getting Help

- Check the [Issues](link-to-issues) section
- Join our Discord community
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed by Alien Technologies

---

**Version**: 0.1.0  
**Last Updated**: January 2025

For more information about the complete Service Marketplace platform, visit our [main repository](link-to-main-repo).
