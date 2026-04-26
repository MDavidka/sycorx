export function shopNow(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.location.href = '/shop'
}

export function addToCartRoses(event: { preventDefault(): void }): void {
  event.preventDefault()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const item = cart.find((i: any) => i.id === 'roses')
  if (item) {
    item.quantity += 1
  } else {
    cart.push({ id: 'roses', name: 'Classic Roses', price: 49, quantity: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  window.alert('Roses added to cart!')
}

export function addToCartTulips(event: { preventDefault(): void }): void {
  event.preventDefault()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const item = cart.find((i: any) => i.id === 'tulips')
  if (item) {
    item.quantity += 1
  } else {
    cart.push({ id: 'tulips', name: 'Spring Tulips', price: 38, quantity: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  window.alert('Tulips added to cart!')
}

export function addToCartMixed(event: { preventDefault(): void }): void {
  event.preventDefault()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const item = cart.find((i: any) => i.id === 'mixed')
  if (item) {
    item.quantity += 1
  } else {
    cart.push({ id: 'mixed', name: 'Mixed Arrangement', price: 65, quantity: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  window.alert('Mixed arrangement added to cart!')
}

export function shopSale(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.location.href = '/shop'
}

export function subscribeNewsletter(event: { preventDefault(): void }): void {
  event.preventDefault()
  const email = (event.target as HTMLFormElement).querySelector('input[type="email"]')?.value
  if (!email || !email.includes('@')) {
    window.alert('Please enter a valid email address.')
    return
  }
  fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  }).then(() => {
    window.alert('Thanks for subscribing! Check your email for exclusive deals.')
    ;(event.target as HTMLFormElement).reset()
  }).catch(() => {
    window.alert('Something went wrong. Please try again.')
  })
}
