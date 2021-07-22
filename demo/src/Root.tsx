import React from 'react'
import { SyncMarkdown } from './SyncMarkdown'
import { AsyncMarkdown } from './AsyncMarkdown'

const path = location.pathname

export const Root = () => (
  <div>{path == '/sync' ? <SyncMarkdown /> : <AsyncMarkdown />}</div>
)
