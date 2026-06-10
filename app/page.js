"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getNames } from "country-list";
export default function Home() {
  const logoRef = useRef(null);
  const nicheDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = getNames().sort();
  const niches = [
    "Gaming", "Tech Review", "Smartphone Review", "AI Content", "Finance Influencers",
    "Stock Market Educators", "Crypto", "Business & Entrepreneurship", "Motivational Speakers",
    "Self-Improvement", "Fitness Coaches", "Gym Influencers", "Nutrition Experts",
    "Doctors & Healthcare", "Educational/Study Channels", "Coding & Programming",
    "Digital Marketing", "Freelancing Coaches", "E-commerce Educators", "Real Estate Influencers",
    "Travel Vloggers", "Food Vloggers", "Fashion Influencers", "Beauty & Makeup",
    "Lifestyle Influencers", "Podcast Hosts", "Interview-Based Channels", "Documentary",
    "News & Current Affairs", "Personal Branding (CEOs, Founders, Consultants)"
  ].sort();

  useEffect(() => {
    function handleClickOutside(event) {
      if (nicheDropdownRef.current && !nicheDropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!logoRef.current) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Stay solid for most of the 1st page, then fade out just before the 2nd page
      const start = 0.6 * vh;
      const end = 1.0 * vh;
      
      let opacity = 1;
      if (scrollY > start && scrollY < end) {
        opacity = 1 - ((scrollY - start) / (end - start));
      } else if (scrollY >= end) {
        opacity = 0;
      }

      logoRef.current.style.opacity = opacity;
      logoRef.current.style.pointerEvents = opacity === 0 ? "none" : "auto";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      {/* Background Bleed Fix for Backdrop Blur */}
      <div className="fixed -inset-[200px] bg-[#1231FF] -z-50"></div>
      
      {/* Top Logo */}
      <div 
        ref={logoRef}
        className="fixed top-[45px] left-[50%] -translate-x-1/2 flex items-center justify-center w-[274px] rounded-[10px] h-[62px] z-50 backdrop-blur-[20px]"
      >
        <Image
          src="/images/11.svg"
          alt="Module Wings Logo"
          width={191}
          height={31}
          className="brightness-0 invert object-contain"
          priority
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col absolute top-1/8 left-1/2 -translate-x-1/2 items-center justify-center text-center px-4 w-full max-w-4xl">
        <h1 className="text-[80px] font-manrope font-extrabold leading-[90px] tracking-tighter mb-8">
          One Team For<br />Every Creative Need.
        </h1>

        <p className="text-[40px] leading-[50px] tracking-tighter mb-6 font-medium">
          We&apos;re helping Content Creators.
        </p>

        <div className="flex items-center gap-3">
          <span className="px-[15.55px] py-[6.44px] bg-white/10 rounded font-satoshi font-medium uppercase text-[15px] font-bold tracking-wide text-white/90">
            By Providing
          </span>
          <span className="text-[40px] font-satoshi font-medium tracking-tighter">
            Motion Graphics.
          </span>
        </div>
      </main>

      {/* 200vh spacer: first 100vh holds the hero view, second 100vh is completely blank */}
      <div className="h-[100vh] w-full shrink-0 pointer-events-none"></div>

      {/* Form Section */}
      <section className="w-full min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="relative">
          {/* Bottom Right Glow Effect */}
          <div className="absolute bottom-[20px] right-[20px] w-[155px] h-[155px] bg-white/80 rounded-full -z-10 blur-[60px]"></div>

          <div className="w-[640px] min-h-[754px] bg-white/[0.1] rounded-[16px] p-[48px] flex flex-col shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] relative isolate">
            {/* Form Card Glass Layer (moved to sibling to prevent nested backdrop-filter bug) */}
            <div className="absolute inset-0 rounded-[16px] backdrop-blur-[80px] -z-10"></div>

            <h2 className="text-[28px] font-manrope font-extrabold mb-[30px] tracking-tight text-white">
            Tell us about your content
          </h2>
          <p className="text-[20px] font-satoshi font-medium leading-[26px] tracking-tighter text-white/90 mb-[40px] max-w-[700px]">
            We&apos;ll understand your vision, handle the production, and help you publish better content at scale.
          </p>

          <form className="flex flex-col flex-1">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[55px] border border-white/10 bg-white/[0.1] rounded-[8px] px-[30px] py-[15px] text-[16px] font-satoshi text-white placeholder:text-white/60 outline-none mb-[16px] transition-colors focus:bg-white/[0.12]"
            />
            <input
              type="text"
              placeholder="Creator name"
              className="w-full h-[55px] border border-white/10 bg-white/[0.1] rounded-[8px] px-[30px] py-[15px] text-[16px] font-satoshi text-white placeholder:text-white/60 outline-none mb-[16px] transition-colors focus:bg-white/[0.12]"
            />
            <div className="relative mb-[16px]" ref={nicheDropdownRef}>
              {/* Dropdown Toggle */}
              <div 
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  if (!isDropdownOpen) setIsCountryDropdownOpen(false);
                }}
                className="w-full h-[55px] border border-white/10 bg-white/[0.1] rounded-[8px] px-[30px] flex items-center justify-between cursor-pointer transition-colors hover:bg-white/[0.12]"
              >
                <span className={`text-[16px] font-satoshi ${selectedNiche ? "text-white" : "text-white/60"}`}>
                  {selectedNiche || "Select niche"}
                </span>
                <svg className={`w-6 h-6 text-white/60 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-[65px] left-0 w-full z-50 rounded-[8px] ">
                  {/* Separate backdrop layer to prevent overflow clipping bugs in browsers */}
                  <div 
                    className="absolute inset-0 bg-[#1231FF]/10 border border-white/10 rounded-[8px] -z-10 backdrop-blur-[50px]"
                    style={{ backdropFilter: 'blur(50px)', WebkitBackdropFilter: 'blur(50px)' }}
                  ></div>
                  
                  {/* Content layer */}
                  <div className="pr-[7px]">
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar py-[8px]">
                      {niches.map((niche) => (
                        <div
                          key={niche}
                          onClick={() => {
                            setSelectedNiche(niche);
                            setIsDropdownOpen(false);
                          }}
                          className="w-[510px] h-[35px] ml-[15px] rounded-[6px] hover:bg-[#000000]/10 flex items-center px-[15px] cursor-pointer transition-colors"
                        >
                          <span className="text-[15px] font-satoshi font-medium text-white">{niche}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative mb-[16px]" ref={countryDropdownRef}>
              {/* Country Dropdown Toggle */}
              <div 
                onClick={() => {
                  setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  if (!isCountryDropdownOpen) setIsDropdownOpen(false);
                }}
                className="w-full h-[55px] border border-white/10 bg-white/[0.1] rounded-[8px] px-[30px] flex items-center justify-between cursor-pointer transition-colors hover:bg-white/[0.12]"
              >
                <span className={`text-[16px] font-satoshi ${selectedCountry ? "text-white" : "text-white/60"}`}>
                  {selectedCountry || "Country"}
                </span>
                <svg className={`w-6 h-6 text-white/60 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {/* Country Dropdown Menu */}
              {isCountryDropdownOpen && (
                <div className="absolute top-[65px] left-0 w-full z-50 rounded-[8px] ">
                  {/* Separate backdrop layer to prevent overflow clipping bugs in browsers */}
                  <div 
                    className="absolute inset-0 bg-[#1231FF]/10 border border-white/10 rounded-[8px] -z-10 backdrop-blur-[50px]"
                    style={{ backdropFilter: 'blur(50px)', WebkitBackdropFilter: 'blur(50px)' }}
                  ></div>
                  
                  {/* Content layer */}
                  <div className="pr-[7px]">
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar py-[8px]">
                      {countries.map((country) => (
                        <div
                          key={country}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryDropdownOpen(false);
                          }}
                          className="w-[510px] h-[35px] ml-[15px] rounded-[6px] hover:bg-[#000000]/10 flex items-center px-[15px] cursor-pointer transition-colors"
                        >
                          <span className="text-[15px] font-satoshi font-medium text-white">{country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <textarea
              placeholder="Briefly describe your channel, content goals, and current challenges and what you want to achieve"
              className="w-full h-[120px] border border-white/10 bg-white/[0.1] rounded-[8px] px-[30px] py-[15px] text-[18px] tracking-tight font-satoshi text-white placeholder:text-white/60 outline-none resize-none mb-[25px] transition-colors focus:bg-white/[0.12]"
            ></textarea>

            <button
              type="submit"
              className="bg-white text-[#1231FF] font-satoshi font-bold text-[18px] rounded-[8px] px-[auto] h-[55px] w-[120px] hover:bg-white/90 transition-colors mt-auto"
            >
              Submit
            </button>
          </form>
        </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full h-[64vh] relative flex justify-center mt-auto z-10">
        <div className="absolute bottom-[70px] w-[981.22px] h-[173.09px] flex flex-col justify-center">
          
          {/* Top Row: Logo & Social Icons */}
          <div className="flex justify-between items-center pb-[20px] border-b border-white/10">
            <Image 
              src="/images/11.svg" 
              alt="ModuleWings Logo" 
              width={169} 
              height={28} 
              className="object-contain" 
            />
            <div className="flex items-center gap-4">
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Image src="/icons/ig.svg" alt="Instagram" width={20} height={20} className="" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Image src="/icons/x.svg" alt="X (Twitter)" width={20} height={20} className="" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Image src="/icons/linkedIn.svg" alt="LinkedIn" width={20} height={20} className="" />
              </a>
            </div>
          </div>

          {/* Middle Row: Links & Copyright */}
          <div className="flex justify-between items-start my-[20px]">
            <div className="flex items-center tracking-tighter gap-6">
              <a href="#" className="text-[14px] font-satoshi font-bold text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[14px] font-satoshi font-bold text-white/50 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
            <span className="text-[14px] font-satoshi tracking-tighter font-bold text-white/50">
              © 2026 Module wings. All rights reserved.
            </span>
          </div>

          {/* Bottom Row: Paragraph */}
          <div className="my-[30px]">
            <p className="text-[14px] font-satoshi leading-[24px]">
              <span className="font-bold text-white">Module Wings. </span>
              <span className="font-medium leading-[10px] tracking-tighter text-[#8898ff]">The hidden cost of managing editors, designers, and developers separately instead of creating content measured in delayed uploads,<br></br> inconsistent quality, missed opportunities, and hours lost to coordination.</span>
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
