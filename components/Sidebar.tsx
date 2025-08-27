"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Database, FileText, Smartphone, Server, Menu, X, Coins } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const navigation = [
  { name: 'Overview', href: '/', icon: FileText },
  { name: 'Swap Model', href: '/model', icon: Database },
  { name: 'Database Schema', href: '/schema', icon: Database },
  { name: 'Mobile App', href: '/mobile', icon: Smartphone },
  { name: 'Backend API', href: '/backend', icon: Server },
  { name: 'Tokens & Pairs', href: '/tokens', icon: Coins },
  { name: 'Examples', href: '/examples', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">YourWallet Docs</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Swap System Documentation</p>
          </div>
          
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
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
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>YourWallet Swap System</p>
                <p className="mt-1">Terra Classic Network</p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
