import Link from "next/link";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold">MicroCloud</div>

          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <Link href="/login">
              <button className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex-1 flex items-center">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold leading-tight text-gray-900">
              Your Files.
              <span className="text-blue-600"> Supercharged.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              A fast, secure, and private cloud storage platform built with
              Next.js, Prisma, and Cloudflare R2. Upload, manage, and access
              your files from anywhere.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="flex items-center justify-center">
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-inner flex items-center justify-center">
              <span className="text-blue-700 font-semibold text-xl">
                Cloud Storage Illustration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-gray-500">
          © {new Date().getFullYear()} MicroCloud — All rights reserved.
        </div>
      </footer>
    </main>
  );
}
