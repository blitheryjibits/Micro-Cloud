"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-8">MicroCloud</h2>

        <nav className="flex flex-col gap-4">
          <a className="text-gray-700 hover:text-blue-600" href="/dashboard">
            Dashboard
          </a>
          <a
            className="text-gray-700 hover:text-blue-600"
            href="/dashboard/files"
          >
            My Files
          </a>
          <a
            className="text-gray-700 hover:text-blue-600"
            href="/dashboard/upload"
          >
            Upload
          </a>
          <a className="text-gray-700 hover:text-blue-600" href="/settings">
            Settings
          </a>
        </nav>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="w-full bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <span className="text-gray-700">User</span>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold">Total Files</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold">Storage Used</h3>
              <p className="text-3xl font-bold mt-2">0 MB</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold">Uploads This Week</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Recent Files</h2>

            <div className="text-gray-500">No files uploaded yet.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
