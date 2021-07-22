import React from 'react'

export const AsyncMarkdown = () => (
  <div>
    <p>Click the "Load" button to reload after changes.</p>
    <button onClick={() => (location.href = '/sync')}>Try synchronously</button>
    <button
      onClick={() =>
        import('./test.md').then(module => {
          const container = document.getElementById('markdown')!
          container.innerHTML = module.default
        })
      }>
      Load test.md
    </button>
    <div id="markdown" className="markdown-body" />
  </div>
)
