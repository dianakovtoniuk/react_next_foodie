# NextLevel Food

A community platform where people share and discover recipes. Built with the Next.js App Router and TypeScript.

## Features

- Browse meals shared by the community
- Meal details page with instructions and creator contact
- Share your own meal through a form with server-side validation
- Image upload to AWS S3 with a live preview before submitting
- Loading, error and not-found states for the meals routes
- Dynamic page metadata

## Tech Stack

- Next.js 14 (App Router, Server Components, Server Actions)
- TypeScript
- React 18
- SQLite via `better-sqlite3`
- AWS S3 (`@aws-sdk/client-s3`)
- CSS Modules
- `slugify` and `xss` for slugs and input sanitization

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

```bash
git clone <repository-url>
cd foodies
npm install
```

### Database

Create and seed the SQLite database:

```bash
npx tsx initdb.ts
```

The script is safe to run more than once.

### Environment

Image uploads go to S3. Provide your AWS credentials through environment variables in `.env.local`:

```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

Then uncomment the `credentials` block in `lib/meals.ts` and update the bucket name and region to match your setup. If you also change the bucket, update the allowed hostname in `next.config.js` and the image URLs in `components/meals/meal-item.tsx` and `app/meals/[mealSlug]/page.tsx`.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Project Structure

```
app/
  meals/
    [mealSlug]/   Meal details page
    share/        Share meal form
  community/      Community page
components/
  images/         Home page slideshow
  main-header/    Header and navigation
  meals/          Meal grid, item, image picker, submit button
lib/
  actions.ts      Server action for sharing a meal
  meals.ts        Database and S3 access
types/
  meal.ts         Shared Meal type
initdb.ts         Database setup and seed script
```
