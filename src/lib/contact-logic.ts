export function submitContactForm(event: { preventDefault(): void; target: unknown }): void {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  
  fetch('/api/contact', {
    method: 'POST',
    body: formData
  })
  .then(async (response) => {
    if (response.ok) {
      form.reset()
      const ticketId = `TKT-${Date.now().toString().slice(-6)}`
      window.alert(`Thank you! Your ticket ${ticketId} has been created. We'll respond within 2 hours.`)
    } else {
      throw new Error('Submission failed')
    }
  })
  .catch(() => {
    window.alert('Something went wrong. Please try again.')
  })
}

export function setFiles(event: { target: { files: FileList | null } }): void {
  const files = Array.from(event.target.files || [])
  if (files.length > 0) {
    const fileNames = files.map(f => f.name).join(', ')
    window.alert(`${files.length} file(s) selected: ${fileNames.slice(0, 50)}${fileNames.length > 50 ? '...' : ''}`)
  }
}

export function toggleChat(): void {
  window.alert('Live chat demo: Connecting to floral expert... (This is a demo widget)')
}
