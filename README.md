# yh-exercises

My personal learning repo. Tracks everything I practice, build, and drill across the full stack,
starting with Gamuda AI Academy coursework, will expand into but not limited to SQL, DSA, and interview prep over time.

This isn't a highlight reel. Broken code gets pushed. WIP commits count. The point is a timestamped record of real work done.

---

## Structure

```
yh-exercises/
  week-03/
    image-gallery/        # React components, props, real-time search
  week-05/
    book-crud-app/
      frontend/           # React + Axios — full CRUD UI
      backend/            # FastAPI + SQLAlchemy + PostgreSQL
  catchup/
    tictactoe/            # useReducer practice
  sql/                    # (upcoming) query drills, window functions, CTEs
  dsa/                    # (upcoming) LeetCode reps, notes, patterns
  whateverNewStuffInTheFuture/
```

Each folder is self-contained. Most have a `LEARNING.md` noting what was attempted cold, what needed a hint, and what clicked after.

---

## Stack covered so far

- **JavaScript** — ES6+, async/await, array methods, closures
- **React** — useState, useEffect, useReducer, controlled inputs, component patterns
- **Axios** — HTTP requests from React to a REST API
- **FastAPI** — REST endpoints, Pydantic validation, dependency injection
- **SQLAlchemy** — ORM models, sessions, full CRUD against PostgreSQL
- **SQL** — JOINs, CTEs, window functions, aggregations (in progress)
- **Git** — branching, pull workflows, conflict resolution

---

## Commit format

```
feat: [topic] — [what it does / what I worked on]
```

Examples:
- `feat: axios crud + fastapi mental model — read/create/update/delete from scratch`
- `feat: useReducer — shopping cart with add/remove/clear`
- `fix: tictactoe — winner detection logic`

---

## How this repo is maintained

Sessions are coached via a custom Claude coding coach skill with spaced repetition and rotation logic across all domains. 
A session log lives in Notion and is read/written at the start and end of every session to maintain continuity across different Claude interfaces (claude.ai, Cowork, etc.).

The coach tracks:
- What's been covered and what needs more reps
- Which domains haven't been touched recently
- What to prioritise next session based on Gamuda coursework and interview-critical topics (SQL, DSA)

---

## Goals

- Land a fullstack/backend role
- Build production-mode muscle memory, not just recognition, but cold-write ability
- Keep every domain warm across JS, React, Python, SQL, and DSA simultaneously
