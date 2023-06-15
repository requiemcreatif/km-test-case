import Image from 'next/image'
import { Inter } from 'next/font/google'
import Campaign from '@/components/Campaign'
import { campaignData } from '@/data/campainData'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col  p-5 mx-auto ${inter.className}`}
    >
      <h1>
        Km Test Case
      </h1>
      <div>
        
      </div>
    </main>
  )
}
