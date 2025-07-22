import './globals.css'

export const metadata = {
  title: 'ChainSight',
  description: 'AI-Powered Smart Contract Risk Analyzer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
