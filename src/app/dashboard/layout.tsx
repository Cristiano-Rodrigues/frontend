import { Sidebar } from "../ui/dashboard/sidebar";
import { Topbar } from "../ui/dashboard/topbar/topbar";

export default function DashboardLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container flex h-screen text-sm text-veryDarkGray">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <div className="w-full h-[calc(100vh-80px)]">
          {children}
        </div>
      </div>
    </main>
  )
}