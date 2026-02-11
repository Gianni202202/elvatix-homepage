export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-white">
              Elvatix
            </a>
            <div className="hidden md:flex gap-6">
              <a href="/modules" className="text-gray-300 hover:text-white transition">
                Modules
              </a>
              <a href="/voor-wie" className="text-gray-300 hover:text-white transition">
                Voor wie
              </a>
              <a href="/case-studies" className="text-gray-300 hover:text-white transition">
                Case Studies
              </a>
              <a href="/contact" className="text-gray-300 hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
          <a 
            href="/demo" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Demo
          </a>
        </div>
      </nav>
    </header>
  );
}