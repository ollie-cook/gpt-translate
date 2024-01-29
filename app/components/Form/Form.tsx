'use client'

import { useState } from "react"

let languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Mandarin",
  "Hindi",
  "Arabic",
  "Bengali",
  "Russian",
  "Portugese",
  "Urdu",
  "Indonesian",
  "Japanese",
  "Pidgin",
  "Marathi",
  "Telugu",
  "Turkish",
  "Tamil",
  "Yue Chinese",
  "Vietnamese"
]

languages = languages.sort()

export default function Form() {
  const [translation, setTranslation] = useState('')
  const [typeLanguage, setTypeLanguage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    setError("")

    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const from = formData.get('from')
    const to = formData.get('to')
    const phrase = formData.get('phrase')
    const context = formData.get('context')

    if (phrase == "") {
      setError("Please provide a phrase to translate")
      setLoading(false)
      return
    }

    try{
      const response = await fetch('/api/translate/?phrase=' + phrase + '&context=' + context + '&from=' + from + '&to=' + to)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))

      setTranslation(response.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form className="flex flex-col mt-8 items-start" onSubmit={handleSubmit}>
        <label htmlFor="from">Translate from</label>
        {
          typeLanguage != true ?
          <select name="from" id="from" className="border border-black rounded-sm text-lg" defaultValue="english">
            {languages.map((language, index) => <option key={index} value={language.toLowerCase()}>{language}</option>)}
          </select>
          :
          <input type="text" name="from" id="from" className="border border-black rounded-sm text-lg pl-1" />
        }
        <label htmlFor="to" className="">to</label>
        {
          typeLanguage != true ?
          <select name="to" id="to" className="border border-black rounded-sm text-lg" defaultValue="french">
            {languages.map((language, index) => <option key={index} value={language.toLowerCase()}>{language}</option>)}
          </select>
          :
          <input type="text" name="to" id="to" className="border border-black rounded-sm text-lg pl-1" />
        }
        {
          typeLanguage != true ?
          <button className="text-sm mt-1 text-neutral-500 underline" onClick={() => setTypeLanguage(true)}>Languages not in list? Click to type instead</button>
          :
          <button className="text-sm mt-1 text-neutral-500 underline" onClick={() => setTypeLanguage(false)}>Click to select languages from list</button>
        }
        
        <label htmlFor="phrase" className="mt-4">Phrase to translate</label>
        <textarea id="phrase" name="phrase" className="border border-black w-full pl-1 rounded-sm" />
        <label htmlFor="context" className="mt-2">Context</label>
        <textarea id="context" name="context" className="border border-black w-full pl-1 rounded-sm" />
        <button 
          type="submit" 
          className="p-2 mt-4 bg-blue-500 text-white font-semibold text-lg rounded-sm self-center hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Translate
        </button>
        {error != "" && <p className="text-red-500 mt-2 self-center">{error}</p>}
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Translation:</h2>
        <p className="mb-16">
          {translation != "" ? translation : "No translation yet"}
        </p>
      </div>
    </>
  )
}