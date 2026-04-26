export function applyDiscount(event: { preventDefault(): void }): void {
  event.preventDefault()
  const code = (event.target as HTMLElement).closest('.space-y-2')?.querySelector('input')?.value || ''
  if (code) {
    window.alert(`Discount code "${code}" applied! 10% off your next purchase.`)
    localStorage.setItem('discountCode', code)
  } else {
    window.alert('Please enter a discount code first.')
  }
}

export function claimDeal1(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.alert('iPhone 15 Pro added to cart for $499! (50% OFF)')
  localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart') || '[]')).concat(['iphone-15-pro-deal'])))
  window.location.href = '/cart'
}

export function claimDeal2(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.alert('Galaxy S24 Ultra added to cart for $899! (31% OFF)')
  localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart') || '[]')).concat(['galaxy-s24-ultra-deal'])))
  window.location.href = '/cart'
}

export function toggleBundlePhone(event: { preventDefault(): void }): void {
  event.preventDefault()
  const checked = localStorage.getItem('bundlePhone') !== 'true'
  localStorage.setItem('bundlePhone', checked.toString())
}

export function toggleBundleCase(event: { preventDefault(): void }): void {
  event.preventDefault()
  const checked = localStorage.getItem('bundleCase') !== 'true'
  localStorage.setItem('bundleCase', checked.toString())
}

export function toggleBundleCharger(event: { preventDefault(): void }): void {
  event.preventDefault()
  const checked = localStorage.getItem('bundleCharger') !== 'true'
  localStorage.setItem('bundleCharger', checked.toString())
}

export function addBundleToCart(event: { preventDefault(): void }): void {
  event.preventDefault()
  const phone = localStorage.getItem('bundlePhone') === 'true'
  const cas = localStorage.getItem('bundleCase') === 'true'
  const charger = localStorage.getItem('bundleCharger') === 'true'
  
  if (!phone) {
    window.alert('Phone is required for bundle.')
    return
  }
  
  const total = 499 + (cas ? 29 : 0) + (charger ? 49 : 0)
  const savings = Math.round(total * 0.2)
  window.alert(`Bundle added to cart! Total: $${total} (Save $${savings} with 20% bundle discount)`)
  localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart') || '[]')).concat(['bundle', phone ? 'iphone' : '', cas ? 'case' : '', charger ? 'charger' : ''])))
  window.location.href = '/cart'
}

export function buyRefurbished1(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.alert('Refurbished iPhone 14 Pro Max added to cart for $699! (1 Year Warranty)')
  localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart') || '[]')).concat(['refurb-iphone-14-pro-max'])))
  window.location.href = '/cart'
}

export function buyRefurbished2(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.alert('Refurbished Pixel 8 Pro added to cart for $599! (2 Year Warranty)')
  localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart') || '[]')).concat(['refurb-pixel-8-pro'])))
  window.location.href = '/cart'
}

export function applyTradein(event: { preventDefault(): void }): void {
  event.preventDefault()
  const model = localStorage.getItem('tradeinModel') || 'iphone-13'
  const condition = localStorage.getItem('tradeinCondition') || 'good'
  const values: Record<string, Record<string, number>> = {
    'iphone-13': { excellent: 350, good: 280, fair: 200 },
    'iphone-14': { excellent: 450, good: 380, fair: 280 },
    'galaxy-s23': { excellent: 400, good: 320, fair: 240 }
  }
  const value = values[model]?.[condition] || 250
  window.alert(`$${value} trade-in credit applied! Your old ${model.replace('-', ' ')} in ${condition} condition is eligible.`)
  localStorage.setItem('tradeinCredit', value.toString())
}
