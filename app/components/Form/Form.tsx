'use client'

import { useState } from "react"

export default function Form() {
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)

    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const phrase = formData.get('phrase')
    const context = formData.get('context')

    if (phrase == "") {
      setError("Please provide a phrase to translate")
      setLoading(false)
      return
    }

    try{
      const response = await fetch('/api/translate/?phrase=' + phrase + '&context=' + context)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))

      setTranslation(response.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form className="flex flex-col mt-8 items-center" onSubmit={handleSubmit}>
        <label htmlFor="phrase" className="self-start">Phrase</label>
        <textarea id="phrase" name="phrase" className="border border-black w-full pl-1 rounded-sm" />
        <label htmlFor="context" className="mt-2 self-start">Context</label>
        <textarea id="context" name="context" className="border border-black w-full pl-1 rounded-sm" />
        <button 
          type="submit" 
          className="p-2 mt-4 bg-blue-500 text-white font-semibold text-lg rounded-sm hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Translate
        </button>
        {error != "" && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Translation:</h2>
        <p>
          {translation != "" ? translation : "No translation yet"}
        </p>
      </div>
    </>
  )
}