'use client'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function JobPostingPage() {
  const [jobDescription, setJobDescription] = useState('') // Store job description content
  const [prompt, setPrompt] = useState(
    'You are evaluating a candidate for a **Technical Data Scientist** role. Use the three weighted criteria below.'
  ) // Store prompt markdown
  const [isEditing, setIsEditing] = useState(false) // Toggle edit mode for prompt
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/job_description.md')
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text)
        setLoading(false)
      })
      .catch(() => setMarkdown('# Error loading job description'))
  }, [])
  const handleSave = () => {
    // Save logic for job description and prompt
  }

  const handleCancel = () => {
    // Logic to discard changes
  }

  return (
    <div className="container p-4">
      <h1 className="text-xl font-semibold mb-4">Job Details</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Prompt Criteria</h2>
        {isEditing ? (
          <textarea
            className="w-full p-4 border rounded"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Edit the criteria prompt here..."
          />
        ) : (
          <ReactMarkdown>{prompt}</ReactMarkdown>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-2 text-blue-500"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default JobPostingPage
