import Link from 'next/link'

export default function Home() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="bg-green-800 text-white px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    
    {/* Logo */}
    <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
      <span className="text-4xl">🥕</span>
      <span className="uppercase">MANDIWISE</span>
    </div>

    {/* Menu */}
    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
  
  <span className="hover:underline cursor-pointer">Home</span>
  
  <span className="hover:underline cursor-pointer">About Us</span>

  {/* 🔽 SERVICES DROPDOWN */}
  <div className="relative group">
    <span className="hover:text-green-200">Services</span>

    {/* Dropdown */}
    <div className="absolute left-0 mt-3 w-64 bg-white text-gray-800 rounded-2xl shadow-xl 
    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
    transition-all duration-300 z-50 overflow-hidden">

      <Link href="/farmer" className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition">
        🌾 <span>Mandi Price Tracker</span>
      </Link>

      <Link href="/msme" className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition">
        🏪 <span>MSME Services</span>
      </Link>

    </div>
  </div>

  <span className="hover:underline cursor-pointer">About MandiWise</span>

  <span className="hover:underline cursor-pointer">Become a User</span>

</div>

    {/* Button */}
    <button className="border border-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-green-800 transition-all">
      Sign Up
    </button>
  </div>
</nav>


      {/* HERO SECTION */}
      <section
  className="h-[500px] flex items-center relative"
  style={{
    backgroundImage: "url('/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative px-12">
    
    <h1
      className="text-white text-5xl font-bold whitespace-nowrap 
      transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      style={{ fontFamily: 'Times New Roman, serif' }}
    >
      Don’t Guess the Price. Know It.
    </h1>

    <p
      className="text-white text-5xl font-bold mt-3 whitespace-nowrap 
      transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      style={{ fontFamily: 'Times New Roman, serif' }}
    >
      Live mandi prices across Maharashtra.
    </p>

  </div>
</section>

     
{/* HEARTFELT MESSAGE SECTION */}
<section className="relative px-6 py-16 bg-[#f8f6f0]">
  <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center gap-10 border border-white/30">

    {/* Farmer Image */}
    <div className="w-full md:w-1/3">
      <img
        src="/farmer.jpg"
        alt="Happy Farmer"
        className="rounded-2xl object-cover w-full h-[280px] shadow-md"
      />
    </div>

    {/* Text Content */}
    <div className="w-full md:w-2/3">

      <h2 className="text-3xl font-semibold text-gray-900 italic mb-5 leading-snug">
        “Every farmer deserves not just a price, but the right price.”
      </h2>

      <p className="text-gray-800 italic leading-relaxed mb-6 text-lg">
        For generations, farmers have relied on guesswork, middlemen, and uncertainty.
        MandiWise changes that. We bring transparency, data, and confidence to every
        selling decision — so you know exactly where and when to sell your crop for the
        best value.
      </p>

      {/* Features */}
      <ul className="space-y-3 text-base text-gray-900">
        <li>✔ Real-time mandi prices across Maharashtra</li>
        <li>✔ Find the best mandi with highest returns</li>
        <li>✔ Track price trends before selling</li>
        <li>✔ Get WhatsApp alerts when prices rise</li>
      </ul>

    </div>

  </div>
</section>
{/* FOOTER NOTE */}
<div className="py-10 text-center">
  <p className="text-gray-500 text-sm italic tracking-wide">
    Made with purpose for Hackathon 🚀
  </p>
</div>
    </main>
  )
}

