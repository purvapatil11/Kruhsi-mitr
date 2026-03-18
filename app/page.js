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
      <span className="hover:underline cursor-pointer">Services</span>
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

    </main>
  )
}

     