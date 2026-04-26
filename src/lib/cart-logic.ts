export function decrementQuantity(event: { preventDefault(): void }): void {
  event.preventDefault()
  const quantityEl = (event.target as HTMLElement).closest('.flex.items-center.space-x-2')?.querySelector('.w-12') as HTMLElement
  if (quantityEl) {
    let qty = parseInt(quantityEl.textContent || '1') - 1
    if (qty < 0) qty = 0
    quantityEl.textContent = qty.toString()
    updateTotals()
  }
}

export function incrementQuantity(event: { preventDefault(): void }): void {
  event.preventDefault()
  const quantityEl = (event.target as HTMLElement).closest('.flex.items-center.space-x-2')?.querySelector('.w-12') as HTMLElement
  if (quantityEl) {
    let qty = parseInt(quantityEl.textContent || '1') + 1
    quantityEl.textContent = qty.toString()
    updateTotals()
  }
}

export function moveToWishlist(event: { preventDefault(): void }): void {
  event.preventDefault()
  const item = (event.target as HTMLElement).closest('.flex.items-center.space-x-4') as HTMLElement
  if (item) {
    item.style.opacity = '0.5'
    item.style.pointerEvents = 'none'
    window.alert('Moved to wishlist!')
  }
}

export function removeItem(event: { preventDefault(): void }): void {
  event.preventDefault()
  const item = (event.target as HTMLElement).closest('.flex.items-center.space-x-4') as HTMLElement
  if (item) {
    item.remove()
    updateTotals()
    window.alert('Item removed from cart')
  }
}

export function decrementQuantity2(event: { preventDefault(): void }): void {
  event.preventDefault()
  const quantityEl = (event.target as HTMLElement).closest('.flex.items-center.space-x-2')?.querySelector('.w-12') as HTMLElement
  if (quantityEl) {
    let qty = parseInt(quantityEl.textContent || '1') - 1
    if (qty < 0) qty = 0
    quantityEl.textContent = qty.toString()
    updateTotals()
  }
}

export function incrementQuantity2(event: { preventDefault(): void }): void {
  event.preventDefault()
  const quantityEl = (event.target as HTMLElement).closest('.flex.items-center.space-x-2')?.querySelector('.w-12') as HTMLElement
  if (quantityEl) {
    let qty = parseInt(quantityEl.textContent || '1') + 1
    quantityEl.textContent = qty.toString()
    updateTotals()
  }
}

export function moveToWishlist2(event: { preventDefault(): void }): void {
  event.preventDefault()
  const item = (event.target as HTMLElement).closest('.flex.items-center.space-x-4') as HTMLElement
  if (item) {
    item.style.opacity = '0.5'
    item.style.pointerEvents = 'none'
    window.alert('Moved to wishlist!')
  }
}

export function removeItem2(event: { preventDefault(): void }): void {
  event.preventDefault()
  const item = (event.target as HTMLElement).closest('.flex.items-center.space-x-4') as HTMLElement
  if (item) {
    item.remove()
    updateTotals()
    window.alert('Item removed from cart')
  }
}

export function updateDiscountCode(event: React.ChangeEvent<HTMLInputElement>): void {
  const input = event.target as HTMLInputElement
  const badge = document.querySelector('.Badge.variant\\:outline') as HTMLElement
  if (badge) {
    badge.textContent = input.value || ''
  }
}

export function applyDiscount(event: { preventDefault(): void }): void {
  event.preventDefault()
  const input = document.querySelector('input[placeholder="Enter code"]') as HTMLInputElement
  const code = input?.value.trim().toUpperCase()
  
  if (code === 'SPRING10' || code === 'ROS10') {
    const badge = document.querySelector('.Badge.variant\\:outline') as HTMLElement
    if (badge) badge.textContent = `${code} (-10%)`
    updateTotals()
    window.alert(`Discount ${code} applied! 10% off.`)
  } else {
    window.alert('Invalid discount code. Try SPRING10 or ROS10.')
  }
}

export function toggleDatePicker(event: { preventDefault(): void }): void {
  // Handled by Popover onOpenChange, no additional logic needed
}

export function selectDeliveryDate(date: Date | undefined): void {
  const button = document.querySelector('Button.variant\\:outline.w-full.justify-start') as HTMLElement
  if (button && date) {
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    button.querySelector('span')!.textContent = dateStr
    updateTotals()
  }
}

function updateTotals(): void {
  const quantities = document.querySelectorAll('.w-12')
  let subtotal = 0
  quantities.forEach((el, index) => {
    const qty = parseInt(el.textContent || '0')
    const prices = [49.99, 39.99]
    subtotal += qty * prices[index % prices.length]
  })
  
  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 9.99
  const discount = document.querySelector('.Badge.variant\\:outline')?.textContent?.includes('-') ? subtotal * 0.1 : 0
  const total = subtotal + tax + shipping - discount
  
  const elements = document.querySelectorAll('.font-medium')
  const spans = Array.from(elements).filter(el => el.parentElement?.querySelector('span') && !el.closest('.text-lg'))
  if (spans[0]) spans[0].textContent = `$${subtotal.toFixed(2)}`
  if (spans[1]) spans[1].textContent = `$${tax.toFixed(2)}`
  if (spans[2]) spans[2].textContent = `$${shipping.toFixed(2)}`
  if (spans[3]) spans[3].textContent = `$${total.toFixed(2)}`
}
