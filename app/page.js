"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getNames } from "country-list";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const logoRef = useRef(null);
  const carouselRef = useRef(null);
  const nicheDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [sendingDots, setSendingDots] = useState("");

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

      // Stay solid during the text animation, then fade out as the user scrolls past the container
      const start = 1.2 * vh;
      const end = 1.5* vh;

      let opacity = 1;
      if (scrollY > start && scrollY < end) {
        opacity = 1 - ((scrollY - start) / (end - start));
      } else if (scrollY >= end) {
        opacity = 0;
      }

      logoRef.current.style.opacity = opacity;
      logoRef.current.style.pointerEvents = opacity === 0 ? "none" : "auto";

      // --- Discrete Carousel Animation Logic ---
      if (!carouselRef.current) return;

      // We want roughly 1 scroll tick (~25px on some devices) per text change. Total 4 items = ~100px total scroll distance.
      const animStart = 0;
      const animEnd = 100;

      let progress = 0;
      if (scrollY >= animStart && scrollY <= animEnd) {
        progress = (scrollY - animStart) / (animEnd - animStart);
      } else if (scrollY > animEnd) {
        progress = 1;
      }

      const totalItems = 4;
      // Calculate discrete active index based on thresholds
      // progress: 0 to <0.25 = 0, 0.25 to <0.5 = 1, 0.5 to <0.75 = 2, 0.75 to 1 = 3
      let activeIndex = Math.floor(progress * totalItems);
      if (activeIndex >= totalItems) activeIndex = totalItems - 1; // clamp

      const itemHeight = 60;
      const currentTranslateY = -(activeIndex * itemHeight);

      // Check if activeIndex changed to trigger a blur animation class
      const currentIndexStr = carouselRef.current.getAttribute('data-active-index');
      if (currentIndexStr !== activeIndex.toString()) {
        carouselRef.current.setAttribute('data-active-index', activeIndex);

        // Add an animation class to all items for a quick blur flash
        const items = carouselRef.current.querySelectorAll('.carousel-item');
        items.forEach((item, idx) => {
          // Clear styles from old continuous logic
          item.style.transform = '';
          item.style.filter = '';
          item.style.opacity = '1';

          // Trigger reflow to restart animation only if it's the newly active item
          if (idx === activeIndex) {
            item.classList.remove('blur-flash-anim');
            void item.offsetWidth;
            item.classList.add('blur-flash-anim');
          } else {
            item.classList.remove('blur-flash-anim');
          }
        });

        // Auto-align vertical scroll width based on active text length
        const activeItem = items[activeIndex];
        if (activeItem) {
          const newWidth = activeItem.offsetWidth;
          // Add a tiny buffer to prevent anti-aliasing cutoff
          carouselRef.current.parentElement.style.width = `${newWidth + 2}px`;
        }
      }

      carouselRef.current.style.transform = `translateY(${currentTranslateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
  }, []);

  useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setSendingDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 500);
    } else {
      setSendingDots("");
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  useEffect(() => {
    if (submitStatus && submitStatus.type === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          niche: selectedNiche,
          country: selectedCountry,
          desc
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setName("");
        setEmail("");
        setSelectedNiche("");
        setSelectedCountry("");
        setDesc("");
        router.push("/success");
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = name.trim() !== "" && email.trim() !== "" && selectedNiche !== "" && selectedCountry !== "" && desc.trim() !== "";

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-clip">

      {/* Error Toast Notification */}
      {submitStatus && submitStatus.type === 'error' && (
        <div className="fixed top-[40px] left-1/2 -translate-x-1/2 z-[100] bg-red-500/90 backdrop-blur-md text-white font-satoshi font-medium px-6 py-3 rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-top-5 duration-300">
          {submitStatus.message}
        </div>
      )}

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

      {/* 150vh Scroll Container */}
      <div className="relative w-full h-[150vh]">

        {/* Sticky Viewport */}
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">

          {/* Main Content */}
          <main className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center px-4 w-full max-w-4xl pointer-events-auto">
            <h1 className="text-[80px] font-manrope font-extrabold leading-[90px] tracking-tighter mb-8">
              One Team For<br />Every Creative Need.
            </h1>

            <p className="text-[40px] leading-[50px] tracking-tighter mb-6 font-medium">
              We&apos;re helping Content Creators.
            </p>

            <div className="w-full flex items-center justify-center">
              <div className="flex items-center justify-center gap-4 mt-2 transition-all duration-700">
                <div className="flex justify-end items-center h-[60px]">
                  <span className="px-[15.55px] py-[6.44px] bg-white/10 rounded font-satoshi font-medium uppercase text-[15px] font-bold tracking-wide text-white/90 whitespace-nowrap">
                    By Providing
                  </span>
                </div>

                {/* 3D Scrolling Text Wrapper */}
                <div className="relative h-[60px] overflow-hidden text-left transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: '315px' }}>
                  <div ref={carouselRef} className="absolute top-0 left-0 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
                    {["Motion Graphics.", "Video Editing.", "Short-form Content.", "Thumbnail."].map((text, idx) => (
                      <span
                        key={idx}
                        className="text-[40px] leading-[60px] h-[60px] inline-flex items-center justify-start font-satoshi font-medium tracking-tighter carousel-item origin-left whitespace-nowrap w-max"
                        style={{ willChange: "transform, opacity, filter" }}
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Form Section */}
      <section className="w-full min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="relative">
          {/* 1. Independent Glow Layer (Perfectly masked, intense soft blur, no backdrop-filter) */}
          <div className="absolute inset-0 rounded-[16px] overflow-hidden -z-20 pointer-events-none">
            <div className="absolute bottom-[20px] right-[20px] w-[155px] h-[155px] bg-white/20 rounded-full blur-[60px]"></div>
          </div>

          {/* 2. Form Card (NO backdrop-blur! This makes the dark vignette physically impossible) */}
          <div className="w-[640px] min-h-[754px] bg-white/[0.1] rounded-[16px] p-[48px] flex flex-col shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] relative isolate">

            <h2 className="text-[28px] font-manrope font-extrabold mb-[30px] tracking-tight text-white">
              Tell us about your content
            </h2>
            <p className="text-[20px] font-satoshi font-medium leading-[26px] tracking-normal text-white/90 mb-[40px] max-w-[700px]">
              We&apos;ll understand your vision, handle the production, and help you publish better content at scale.
            </p>

            <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[55px] border border-white/10 focus:border-white bg-white/[0.1] rounded-[8px] px-[30px] py-[15px] text-[16px] font-satoshi text-white placeholder:text-white/60 outline-none mb-[16px] transition-colors focus:bg-white/[0.12]"
              />
              <input
                type="text"
                placeholder="Creator name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-[55px] border border-white/10 focus:border-white bg-white/[0.1] rounded-[8px] px-[30px] py-[15px] text-[16px] font-satoshi text-white placeholder:text-white/60 outline-none mb-[16px] transition-colors focus:bg-white/[0.12]"
              />
              <div className="relative mb-[16px]" ref={nicheDropdownRef}>
                {/* Dropdown Toggle */}
                <div
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    if (!isDropdownOpen) setIsCountryDropdownOpen(false);
                  }}
                  className={`w-full h-[55px] border ${isDropdownOpen ? "border-white" : "border-white/10"} bg-white/[0.1] rounded-[8px] px-[30px] flex items-center justify-between cursor-pointer transition-colors hover:bg-white/[0.12]`}
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
                  className={`w-full h-[55px] border ${isCountryDropdownOpen ? "border-white" : "border-white/10"} bg-white/[0.1] rounded-[8px] px-[30px] flex items-center justify-between cursor-pointer transition-colors hover:bg-white/[0.12]`}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                className="w-full h-[120px] border border-white/10 focus:border-white bg-white/[0.1] rounded-[8px] px-[30px] py-[15px] text-[18px] tracking-tight font-satoshi text-white placeholder:text-white/60 outline-none resize-none mb-[25px] transition-colors focus:bg-white/[0.12]"
              ></textarea>

              <div className="flex items-center gap-4 mt-auto">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormComplete}
                  className={`font-satoshi font-bold text-[18px] rounded-[8px] px-[auto] h-[55px] w-[120px] transition-colors ${isFormComplete && !isSubmitting
                    ? "bg-white text-[#1231FF] hover:bg-white/90 cursor-pointer"
                    : "bg-white/30 text-[#1231FF] cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? `Sending${sendingDots}` : "Submit"}
                </button>
              </div>
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
            <div className="flex items-center tracking-normal gap-6">
              <a href="#" className="text-[14px] font-satoshi font-bold text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[14px] font-satoshi font-bold text-white/50 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
            <span className="text-[14px] font-satoshi tracking-normal font-bold text-white/50">
              © 2026 Module wings. All rights reserved.
            </span>
          </div>

          {/* Bottom Row: Paragraph */}
          <div className="my-[30px]">
            <p className="text-[14px] font-satoshi leading-[24px]">
              <span className="font-bold text-white">Module Wings. </span>
              <span className="font-medium leading-[10px] tracking-normal text-[#8898ff]">The hidden cost of managing editors, designers, and developers separately instead of creating content measured in delayed uploads,<br></br> inconsistent quality, missed opportunities, and hours lost to coordination.</span>
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
