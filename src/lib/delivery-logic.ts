export function checkCoverage(event: { preventDefault(): void }): void {
  event.preventDefault()
  const zipCode = (event.target as HTMLFormElement).querySelector('input')?.value || ''
  if (!zipCode.match(/^\d{5}$/)) {
    window.alert('Please enter a valid 5-digit ZIP code.')
    return
  }
  fetch('/api/delivery/coverage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ zipCode })
  }).then(res => res.json()).then(data => {
    if (data.covered) {
      window.alert(`ZIP ${zipCode} is within our delivery area!`)
    } else {
      window.alert(`Sorry, ZIP ${zipCode} is outside our service area.`)
    }
  }).catch(() => {
    window.alert('Service area check unavailable. Please try again.')
  })
}
