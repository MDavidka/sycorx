import { Routes, Route } from 'react-router-dom'
import { SiteNav } from './components/site-nav'
import siteStructure from './data/site-structure.json'
import { Home } from './pages/index'
import { Products } from './pages/products'
import { Categories } from './pages/categories'
import { Deals } from './pages/deals'
import { About } from './pages/about'
import { Contact } from './pages/contact'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav items={siteStructure.nav} />
      <main className="flex-1">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}
