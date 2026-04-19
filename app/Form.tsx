'use client'
import { useState, FormEvent } from 'react'

type FormProps = {
    onSubmit: (name: string) => void
}

export default function Form({ onSubmit }: FormProps) {
    const [name, setName] = useState<string>('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmed = name.trim()
        if (!trimmed) return
        onSubmit(trimmed)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type="submit">Start</button>
        </form>
    )
}
