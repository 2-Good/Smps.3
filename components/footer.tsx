'use client'

import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-l-0 border-r-0 border-b-0 rounded-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/60 border border-white/10 overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10">
                <img
                  src="/school-logo.png"
                  alt="Shashi Madan Public School crest"
                  className="h-full w-auto max-w-none object-cover object-left scale-[1.15]"
                />
              </div>
              <h3 className="font-semibold text-gradient">SMPS Chandausi</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Shashi Madan Public School — an inclusive community of lifelong learners, run by the M.P. Singh Foundation.
            </p>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">Address</h3>
                <p className="text-sm text-muted-foreground">
                  SM Education City, Shiv Shakti Nagar, NH-509, Chandausi, Sambhal – 244414
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  +91-9258159506<br />
                  +91-9258159507
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Email</h3>
                  <a href="mailto:info@smpschandausi.com" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    info@smpschandausi.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Website</h3>
                  <a href="https://smpschandausi.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    smpschandausi.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-glass-border mt-8 pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 Shashi Madan Public School. All rights reserved. Operated by M.P. Singh Foundation (Est. 2002)
          </p>
        </div>
      </div>
    </footer>
  )
}
