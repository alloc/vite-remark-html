import React from 'react'
import html from './test.md'

export const SyncMarkdown = () => (
  <div>
    <p>
      Synchronous use is <b style={{ color: 'red' }}>hot-reloaded</b>{' '}
      automatically.
    </p>
    <button onClick={() => (location.href = '/')}>Try asynchronously</button>
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  </div>
)
