# LingoPath — React + Express + MongoDB

This is a responsive Chinese-learning starter based on the Mongoose backend you supplied. The original `.env` and `node_modules` were deliberately excluded from this package.

## Structure
- `client/` — React + Vite UI, routing, auth screens, course/lesson/vocabulary pages and responsive theme.
- `server/` — your Express/Mongoose backend, repaired auth routes and query filters.
- `server/model/Progress.model.js` — added MongoDB student progress storage.

## Run locally
1. Ensure MongoDB is running locally or create a MongoDB Atlas database.
2. Copy `server/.env.example` to `server/.env`, set your MongoDB URI and two different long token secrets.
3. Terminal 1: `cd server` → `npm install` → `npm run dev`.
4. Terminal 2: `cd client` → copy `.env.example` to `.env` → `npm install` → `npm run dev`.
5. Open `http://localhost:5173`.

## API routes used
- `POST /api/auth/register`, `/login`, `/refresh`, `/logout`
- `GET /api/course/course`
- `GET /api/lesson/lesson?courseId=...`
- `GET /api/lesson/lesson/:id`
- `GET /api/progress/mine` (Bearer token)
- `POST /api/progress/lesson/:lessonId` with `{ "score": 80 }` (Bearer token)
- `GET /api/progress/certificates` (Bearer token)
- `GET /api/vocabulary/vocabulary?lessonId=...`

## Add learning content
Create Course documents, then create Lesson documents for each course, then Vocabulary documents for each lesson using your existing endpoints. The UI reads this real MongoDB data. Sample course cards are fallback previews only; they are not automatically inserted into MongoDB.

## Certificate status
This version calculates **eligibility**: a learner must pass every lesson in a course with 70% or higher. It does not yet generate a downloadable certificate PDF, unique verification ID, QR code or accredited certificate. Those require a separate certificate-generation and verification feature. Do not promise a formal certificate until that feature and your course requirements are complete.

## Notes
- `CLIENT_URL` must match the frontend origin.
- Keep `.env` out of GitHub and never share secrets.
- Test the app against your actual MongoDB database and content before deployment. This starter has not been verified against your live database or deployed environment.
