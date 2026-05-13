export function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white/70 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M22 14a6 6 0 0 0-11.7-1.3A5 5 0 0 0 11 22h11a4 4 0 0 0 0-8Z"
                  fill="#50E6FF"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight text-white">Cloud1</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Microsoft Solutions Partner.
              <br />
              Werkplek, security, cloud & beheer.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Diensten</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Moderne werkplek</a></li>
              <li><a href="#" className="hover:text-white">Beveiliging</a></li>
              <li><a href="#" className="hover:text-white">Connectiviteit</a></li>
              <li><a href="#" className="hover:text-white">Managed services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Over Cloud1</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Onze aanpak</a></li>
              <li><a href="#" className="hover:text-white">Klantcases</a></li>
              <li><a href="#" className="hover:text-white">Werken bij</a></li>
              <li><a href="#" className="hover:text-white">Nieuws</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>info@cloud1.nl</li>
              <li>085 - 000 0000</li>
              <li className="pt-2"><a href="#" className="hover:text-white">Plan een gesprek</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          <span>© {new Date().getFullYear()} Cloud1. Alle rechten voorbehouden.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Voorwaarden</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
