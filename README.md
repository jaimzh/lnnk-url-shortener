# LNNK URL Shortener

A modern, fast, and minimal URL shortener built with Next.js and MongoDB.

## Live Demo
- [lnnk Official Site](https://lnnk.click/)
- [Main Instance](https://lnnk.pxxl.click/)
- [Vercel Mirror](https://lnnkkk.vercel.app/)

## Features

- **Fast Redirection**: Instant redirection from short aliases to original URLs.
- **QR Code Generation**: Automatically generate QR codes for Every shortened link.
- **Dynamic UI**: Smooth transitions and interactive elements powered by Framer Motion.
- **Secure & Robust**: URL validation using Zod and unique ID generation with Nanoid.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Validation**: [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jaimzh/lnnk-url-shortener.git
   cd lnnk-url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   BASE_URL=http://localhost:3000/
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For a deeper dive into the logic behind this project, check out:

- [My Thoughts & Brain Dump](MY_THOUGHTS.md)
- [How it Works(Deep Dive)](HOW_IT_WORKS.md)

## License

MIT
