"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-[150vh] relative w-full overflow-x-hidden">
      {/* Background Bleed Fix */}
      <div className="fixed -inset-[200px] bg-[#1231FF] -z-50"></div>

      {/* Top Logo */}
      <div className="fixed top-[20px] md:top-[45px] left-[50%] -translate-x-1/2 flex items-center justify-center w-[200px] md:w-[274px] rounded-[10px] h-[45px] md:h-[62px] z-50 backdrop-blur-[20px]">
        <Image
          src="/images/11.svg"
          alt="Module Wings Logo"
          width={191}
          height={31}
          className="brightness-0 invert object-contain w-[150px] md:w-[191px] h-auto"
          priority
        />
      </div>

      <main className="absolute top-[45vh] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center px-4 z-10 w-full max-w-4xl">
        <h1 className="text-[35px] md:text-[70px] font-manrope font-extrabold text-white tracking-tight leading-[40px] md:leading-[75px] mb-4">
          Thank You for Reaching Out!
        </h1>
        {/* Mobile View: Single Paragraph */}
        <p className="md:hidden text-[15px] leading-[22px] tracking-tighter font-satoshi font-medium text-white/50 mb-0 max-w-[326.57px] mx-auto">
          We&apos;ve received your submission and are reviewing your content and goals. We&apos;ll contact you within 24-72 hours with the next steps.
        </p>

        {/* Desktop View: Two Paragraphs */}
        <p className="hidden md:block text-[24px] leading-tight tracking-tighter font-satoshi font-medium text-white/50 mb-1 mx-auto">
          We&apos;ve received your submission and are reviewing your content and goals.
        </p>
        <p className="hidden md:block text-[24px] leading-tight tracking-tighter font-satoshi font-medium text-white/50 mb-0 mx-auto">
          We&apos;ll contact you within 24-72 hours with the next steps.
        </p>
        
        <button
          onClick={() => router.push("/")}
          className="bg-white text-[#1231FF] mt-[26px] font-satoshi font-bold text-[13px] md:text-[18px] rounded-[8px] flex items-center justify-center w-[187.5px] h-[41.25px] md:w-[250px] md:h-[55px] hover:bg-white/90 transition-colors mx-auto"
        >
          Continue Exploring
        </button>
      </main>

      {/* Footer Section */}
      <footer className="w-full min-h-[64vh] relative flex justify-center mt-auto z-10 px-6 pt-20 md:pt-0 pb-10 md:pb-0">
        <div className="relative md:absolute md:bottom-[70px] w-full max-w-[981px] flex flex-col justify-end md:justify-center">

          {/* Top Row: Logo & Social Icons */}
          <div className="flex justify-between items-center pb-[20px] border-b border-white/10">
            <Image
              src="/images/11.svg"
              alt="ModuleWings Logo"
              width={120}
              height={20}
              className="object-contain w-[120px] md:w-[169px] h-auto"
            />
            <div className="flex items-center gap-3 md:gap-4">
              <a href="https://www.instagram.com/modulewings/" className="opacity-50 hover:opacity-100 transition-opacity">
                <Image src="/icons/ig.svg" alt="Instagram" width={20} height={20} className="" />
              </a>
              <a href="https://x.com/ModuleWings" className="opacity-50 hover:opacity-100 transition-opacity">
                <Image src="/icons/x.svg" alt="X (Twitter)" width={20} height={20} className="" />
              </a>
              <a href="https://www.linkedin.com/in/modulewings/" className="opacity-50 hover:opacity-100 transition-opacity">
                <Image src="/icons/linkedIn.svg" alt="LinkedIn" width={20} height={20} className="" />
              </a>
            </div>
          </div>

          {/* Middle Row: Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-[20px] gap-4 md:gap-0">
            <div className="flex items-center tracking-normal gap-4 md:gap-6">
              <a href="#" className="text-[12px] md:text-[14px] font-satoshi font-bold text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[12px] md:text-[14px] font-satoshi font-bold text-white/50 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
            <span className="text-[12px] md:text-[14px] font-satoshi tracking-normal font-bold text-white/50">
              © 2026 Module wings. All rights reserved.
            </span>
          </div>

          {/* Bottom Row: Paragraph */}
          <div className="my-[20px] md:my-[30px]">
            <p className="text-[12px] md:text-[14px] font-satoshi leading-[18px] md:leading-[24px]">
              <span className="font-bold text-white">Module Wings. </span>
              <span className="font-medium tracking-normal text-[#8898ff]">The hidden cost of managing editors, designers, and developers separately instead of creating content measured in delayed uploads, inconsistent quality, missed opportunities, and hours lost to coordination.</span>
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
