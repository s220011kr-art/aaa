# Firebase Realtime Monitoring System

## Overview

This is a full-stack web application that monitors Firebase Realtime Database for "finish" messages and provides visual feedback through screen flashing. The system features a React frontend with a Node.js/Express backend, utilizing modern web technologies for real-time data monitoring and responsive user interface design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Component-based architecture using functional components and hooks
- **Vite**: Modern build tool for fast development and optimized production builds
- **Wouter**: Lightweight client-side routing solution
- **shadcn/ui**: Comprehensive UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **TanStack Query**: Server state management for API calls and caching

### Backend Architecture
- **Express.js**: RESTful API server with middleware-based request handling
- **TypeScript**: Type-safe development across the entire stack
- **In-memory Storage**: Simple user storage implementation using Map data structure
- **Drizzle ORM**: Database toolkit configured for PostgreSQL with schema management
- **Session Management**: Built-in session handling with connect-pg-simple

### Component Design
- **Modular UI Components**: Reusable components for configuration, status display, and message logging
- **State Management**: Local React state for real-time monitoring features
- **Toast Notifications**: User feedback system for important events
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Real-time Features
- **Firebase Integration**: Client-side Firebase SDK for real-time database monitoring
- **Visual Feedback**: Screen flashing mechanism with countdown timer
- **Message Logging**: Persistent log of received messages with timestamps
- **Connection Status**: Real-time connection state monitoring

### Database Schema
- **User Management**: Simple user table with username/password authentication
- **PostgreSQL Integration**: Configured through Drizzle ORM with migration support
- **UUID Primary Keys**: Using PostgreSQL's built-in UUID generation

### Build and Development
- **Development Server**: Hot module replacement with Vite integration
- **Production Build**: Optimized bundling for both client and server
- **TypeScript Compilation**: Strict type checking across the entire codebase
- **Asset Management**: Proper static file serving and asset optimization

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and concurrent features
- **Express.js**: Backend web application framework
- **TypeScript**: Static typing for JavaScript
- **Vite**: Build tool and development server

### UI and Styling
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe styling variants

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: PostgreSQL database connection
- **connect-pg-simple**: PostgreSQL session store

### State Management and Data Fetching
- **TanStack Query**: Server state management
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation library

### Firebase Integration
- **Firebase SDK**: Real-time database connectivity (client-side integration)
- **Real-time Database**: For monitoring "finish" messages

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS post-processing with Autoprefixer

### Additional Libraries
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight routing solution
- **nanoid**: Unique ID generation
- **embla-carousel-react**: Carousel component library