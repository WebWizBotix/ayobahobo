/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: app/todos/page.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-05-21
 * Last Updated: 2026-05-21
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 font-sans">
      <section className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Supabase Todos
          </h1>
          <p className="text-sm text-gray-400">
            Realtime connection test with Supabase
          </p>
        </header>

        <ul className="space-y-3">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                  {todo.name}
                </span>
              </li>
            ))
          ) : (
            <li className="text-center py-8 text-gray-500 text-sm border border-dashed border-white/10 rounded-xl">
              No todos found or database table is empty.
            </li>
          )}
        </ul>

        <footer className="pt-4 border-t border-white/5 text-center">
          <a
            href="/"
            className="inline-block text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            ← Back to Storefront
          </a>
        </footer>
      </section>
    </main>
  )
}
