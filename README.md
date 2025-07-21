# TalentRadar

TalentRadar is a comprehensive talent management application that allows users to assess their technical skills, especially in the field of software development. Built with modern web technologies, it provides an intuitive platform for skill evaluation and career development......

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router.
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18.0.0 or higher)
- **pnpm** (recommended package manager)
- **Git**

### Installing pnpm

If you don't have pnpm installed, you can install it using one of these methods:

```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using Chocolatey (Windows)
choco install pnpm

# Using Scoop (Windows)
scoop install pnpm
```

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone git@github.com:AmaliTech-Training-Academy/talentradar-frontend-project-rw.git
cd talentradar-frontend-project-rw
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```bash
# Copy the example environment file (if available)
cp .env.example .env.local

# Or create a new one
touch .env.local
```

Add the following variables to your `.env.local` file:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url
# DATABASE_URL=your_database_url
```

### 4. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```bash
talent_radar/
├── app/                    # App Router directory (Next.js 13+)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── common/           # Common components
│   ├── feature-specific/ # Feature-specific components (feel free to add more )
│   │   ├── admin/       # Admin-related components
│   │   └── dashboard/   # Dashboard components
│   ├── forms/           # Form components
│   ├── providers/       # Context providers
│   └── ui/              # Base UI components
├── lib/                  # Utility libraries
│   ├── api/             # API utilities
│   ├── hooks/           # Custom React hooks
│   ├── schemas/         # Zod validation schemas
│   ├── types/           # TypeScript type definitions
│   └── utils.ts         # General utilities
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.ts       # Next.js configuration
```

## 🔧 Available Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## 🎨 UI Components

This project uses a custom component library built with:

- **Radix UI** for unstyled, accessible components
- **Tailwind CSS** for styling
- **class-variance-authority** for component variants
- **tailwind-merge** for conditional classes

The UI components are located in the `components/ui/` directory and follow the [shadcn/ui](https://ui.shadcn.com/) pattern.

## 🌙 Theme Support

The application supports both light and dark themes using `next-themes`. Users can toggle between themes or use system preferences.

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing file and folder structure
- Use meaningful component and variable names
- Implement proper error handling
- Write descriptive commit messages

### Component Structure

- Place reusable components in `components/ui/`
- Feature-specific components go in `components/feature-specific/`
- Use TypeScript interfaces for prop definitions
- Implement proper accessibility features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/AmaliTech-Training-Academy/talentradar-frontend-project-rw/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the component design system
