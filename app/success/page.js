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
      <div className="fixed top-[45px] left-[50%] -translate-x-1/2 flex items-center justify-center w-[274px] rounded-[10px] h-[62px] z-50 backdrop-blur-[20px]">
        <Image
          src="/images/11.svg"
          alt="Module Wings Logo"
          width={191}
          height={31}
          priority
        />
      </div>

      <main className="flex flex-col items-center text-center px-4 z-10 pt-[287px]">
        <h1 className="text-[70px] font-manrope font-extrabold text-white tracking-tight mb-4">
          Thank You for Reaching Out!
        </h1>
        <p className="text-[24px] leading-tight tracking-tighter font-satoshi font-medium text-white/50 mb-1">
          We&apos;ve received your submission and are reviewing your content and goals.
        </p>
        <p className="text-[24px] leading-tight tracking-tighter font-satoshi font-medium text-white/50 mb-8">
          We&apos;ll contact you within 24-72 hours with the next steps.
        </p>
        
        <button
          onClick={() => router.push("/")}
          className="bg-white text-[#1231FF] mt-[30px] font-satoshi font-bold text-[18px] rounded-[8px] px-8 h-[55px] w-[250px] hover:bg-white/90 transition-colors"
        >
          Continue Exploring
        </button>
      </main>

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
