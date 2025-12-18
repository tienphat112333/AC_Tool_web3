import { HeaderAuth } from '../../components/header'
import { Sidebar } from '../../components/sidebar'

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderAuth />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
