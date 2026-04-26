export function submitForm(event: { preventDefault(): void; target?: HTMLFormElement }): void {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  if (!form) return

  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(() => {
      window.alert('Thank you for your message! We will get back to you within 24 hours.')
      form.reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    .catch(() => {
      window.alert('Something went wrong. Please try again or call our 24/7 support line.')
    })
}

export function openLiveChat(event: { preventDefault(): void }): void {
  event.preventDefault()
  window.open('https://livechat.example.com', '_blank', 'width=400,height=600')
}
