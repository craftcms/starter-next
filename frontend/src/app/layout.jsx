import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        
        <main className="page min-h-screen" id="main" tabIndex="-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
