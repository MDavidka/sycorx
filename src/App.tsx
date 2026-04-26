import { Routes, Route } from 'react-router-dom'
import { SiteNav } from './components/site-nav'
import siteStructure from './data/site-structure.json'
import { Home } from './pages/index'
import { Shop } from './pages/shop'
import { Cart } from './pages/cart'
import { Checkout } from './pages/checkout'
import { About } from './pages/about'
import { Delivery } from './pages/delivery'
import { Contact } from './pages/contact'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav items={siteStructure.nav} />
      <main className="flex-1">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}
