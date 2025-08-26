'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Database, FileText, Settings, Smartphone, Server } from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/', icon: FileText },
  { name: 'Swap Model', href: '/model', icon: Database },
  { name: 'Database Schema', href: '/schema', icon: Database },
  { name: 'Mobile App', href: '/mobile', icon: Smartphone },
  { name: 'Backend API', href: '/backend', icon: Server },
  { name: 'Examples', href: '/examples', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">YourWallet Docs</h1>
        <p className="text-sm text-gray-600 mt-1">Swap System Documentation</p>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>YourWallet Swap System</p>
          <p className="mt-1">Terra Classic Network</p>
        </div>
      </div>
    </div>
  )
}
