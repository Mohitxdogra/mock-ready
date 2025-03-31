const partners = [
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  }
]

export function MarqueeLogos() {
  // Duplicate the partners array to create a seamless loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-24 bg-gray-800 overflow-hidden">
      <div className="container px-4 mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 text-pink-500">
          Trusted by Leading Companies
        </h2>
        <div className="relative">
          {/* Gradient Overlay Left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-800 to-transparent z-10" />
          
          {/* Gradient Overlay Right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-800 to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-none mx-8 w-40 bg-gray-900 rounded-lg p-6 flex items-center justify-center group transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 w-auto filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 