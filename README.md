# Micro-Cloud

A high performance, privacy focused cloud storage solution built for nested file management, secure sharing, and multi-format object storage. The goal of this project is to demonstrate software engineering principles, moving beyond simple CRUD projects to a ditributed, domain driven architecture.

## Project Vision

Provide a robust, production ready cloud storage solution with a clean, maintainable architecture and code base. The storage solution will offer "infinite" folder nesting structures, high-performance data retrieval and operations coupled with industry level authentication.

## Architectural Principles

### 1. Domain Driven Design (DDD) & Feature Slice Design (FSD)

This is a full-stack applicaiton that clearly defines a boundary between the frontend and backend for scalablity and maintainability.
The Backend is built followind DDD principles defined by Eric Evans in his book Domain-Drive Design: Tackling Complexity in the Heart of Software.
The frontend utilises FSD as it is illustrated on the website: https://feature-sliced.design/.
The reason for choosing these two design patterns was to create a maintainable and extensible project architecture that would offer quick and painless onboarding for newer team members.

### 2. Stateless and Scalable Storage

The application tier remains stateless. Binary Data never touches the local server disk, instead, utilizing Amazon S3 CLient with "presigned URLs" to send files and media directly to Cloudflare R2 storage, minimizing server overhead and maximizing upload speed.

### 3. Type Safety and Validation

Data integrity is enforced on every layer of the application. Typescript for Developers (because who doesn't enjoy the autocomplete prowess of TS), ZOD for runtime validation which gaurds all server actions adn API routes, while Prisma ensures a type-safe interface between the application and PostgreSQL database.

### 4. Optimized Retrieval (B+ tree indexing)

The prisma database schema employes indexing (which results in B+ tree indexes as Prisma's default behavior) on all unique constraints to optimize data retrieval and look-up.
In addition, implicit indexes were create to enhance file and folder lookups to ensure smooth navigation.

## Tech Stack and Rationale

### Frontend

#### Next.js 16 (App Router)

Leverages React Server Components (RSC) for reduced client-side JS and faster Initial Page Loads. Offers built-in image optimization, streaming, and server actions, which eliminate the need for a separate API layer for many operations. The App Router architecture provides a clean, file‑system‑based routing model with layouts, nested routes, and parallel rendering—ideal for building a dashboard‑driven application like a cloud file manager.

#### Tailwind CSS

Utility‑first styling enables rapid UI development with consistent spacing, typography, and responsive behavior. Tailwind eliminates the need for hand‑rolled CSS architecture and scales cleanly as the application grows. It also pairs perfectly with RSC because styles are generated at build time, not runtime.

#### shadcn/ui

Provides a high‑quality, accessible component library built on Radix UI primitives. Unlike traditional UI kits, shadcn/ui ships components as source code, giving full control over styling and behavior. This is ideal for a production file‑storage dashboard where custom interactions (dialogs, dropdowns, file cards, context menus) need to be tailored to the product rather than constrained by a black‑box component library.

#### Authentication with Better Auth

A modern, lightweight authentication framework designed specifically for the Next.js App Router. It avoids the complexity and overhead of older solutions like NextAuth, while offering:

- first‑class TypeScript support

- secure session handling

- built‑in email/password flows

- extensible user models

- zero client‑side hydration requirements

Better Auth integrates cleanly with Prisma and server actions, making it ideal for a full‑stack application where authentication must be secure, ergonomic, and tightly coupled to backend logic.

### Backend

#### Neon + Prisma (PostgreSQL)

Neon provides a serverless, auto‑scaling PostgreSQL backend with built‑in connection pooling and branching. This is perfect for a modern cloud‑storage platform where workloads are bursty and unpredictable.

Prisma adds a type‑safe ORM layer with:

- schema‑driven development

- automatic migrations

- rich relational modeling (files, folders, permissions, versions)

- compile‑time safety

The combination of Neon + Prisma provides the reliability of Postgres with the developer experience of a modern ORM. It also integrates seamlessly with server actions, eliminating the need for a separate backend service.

### Storage

#### Cloudflare R2

R2 is an S3‑compatible object storage service with zero egress fees—critical for a file‑storage product where users frequently download and share files. It offers:

- high‑performance object storage

- S3‑compatible API

- global edge caching

- predictable pricing

Using R2 for file blobs and Postgres for metadata is the industry‑standard architecture for scalable storage systems (similar to Dropbox, Google Drive, and Notion).
