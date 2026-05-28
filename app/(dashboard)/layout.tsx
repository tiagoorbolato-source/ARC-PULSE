import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050816]">
      <Header />
      <Sidebar />
      <main className="pl-64 pt-32 min-h-screen transition-all duration-300">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
