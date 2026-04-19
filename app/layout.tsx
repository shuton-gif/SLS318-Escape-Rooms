import { ReactNode } from 'react'
import './globals.css'

export const metadata = {
    title: 'SLS318 Escape Rooms',
    description: 'Local WiFi app with SQLite',
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
