import { HeaderAuth } from './components/header'
import { Footer } from './components/footer'
import { Sidebar } from './components/sidebar'

const App = () => {
  return (
    <>
      <HeaderAuth />
      <Sidebar />
      <main>
        <h1 className="font-bold text-center my-20">AC Tools</h1>
      </main>
      <Footer />
    </>
  )
}

export default App
