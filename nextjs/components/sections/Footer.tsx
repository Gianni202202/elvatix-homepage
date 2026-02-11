export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Modules */}
          <div>
            <h3 className="text-white font-semibold mb-4">Modules</h3>
            <ul className="space-y-2">
              <li><a href="/module-inmails" className="hover:text-white transition">InMails</a></li>
              <li><a href="/module-connectieverzoeken" className="hover:text-white transition">Connectieverzoeken</a></li>
              <li><a href="/module-reminders" className="hover:text-white transition">Reminders</a></li>
              <li><a href="/module-custom-gpt" className="hover:text-white transition">Custom GPT</a></li>
              <li><a href="/module-template-instructies" className="hover:text-white transition">Template Instructies</a></li>
              <li><a href="/module-recruitment-sales-switch" className="hover:text-white transition">Sales Switch</a></li>
            </ul>
          </div>

          {/* Voor wie */}
          <div>
            <h3 className="text-white font-semibold mb-4">Voor wie</h3>
            <ul className="space-y-2">
              <li><a href="/voor-recruitmentbureaus" className="hover:text-white transition">Recruitmentbureaus</a></li>
              <li><a href="/voor-detacheringsbureaus" className="hover:text-white transition">Detacheringsbureaus</a></li>
              <li><a href="/voor-corporate-recruiters" className="hover:text-white transition">Corporate Recruiters</a></li>
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Case Studies</h3>
            <ul className="space-y-2">
              <li><a href="/case-study-manpower" className="hover:text-white transition">Manpower</a></li>
              <li><a href="/case-study-vibegroup" className="hover:text-white transition">Vibe Group</a></li>
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bedrijf</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="/blogs" className="hover:text-white transition">Blog</a></li>
              <li><a href="/integraties-linkedin" className="hover:text-white transition">Integraties</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Volg ons</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://linkedin.com/in/gianni-linssen-742842315" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Elvatix. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}