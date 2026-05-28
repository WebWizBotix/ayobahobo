/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: page.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-05-25
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

export default function AIDisclaimer() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center pt-32 pb-24 px-6">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <div className="border-b border-white/10 pb-8 mb-4 lg:mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter uppercase">AI-Generated Content Disclaimer</h1>
          <p className="text-white/40 tracking-widest uppercase text-xs md:text-sm mt-4">Ayoba Hobo</p>
        </div>
        
        <div className="text-white/80 font-light text-base md:text-lg leading-relaxed space-y-8">
          
          <p>
            At Ayoba Hobo, creativity and storytelling are at the heart of our brand. As part of our visual identity, this website and our marketing materials may include images and representations of people that have been created using artificial intelligence (AI) technology.
          </p>

          <p>
            These images are entirely fictional and are used for inspiration, entertainment, and branding purposes only. Any resemblance to real persons, living or deceased, is purely coincidental and unintentional.
          </p>

          <p>
            Ayoba Hobo does not use AI-generated content to replicate, imitate, or portray any real individual without their explicit consent. No person shown in our AI-generated visuals should be interpreted as a real customer, model, or endorser of our products.
          </p>

          <p>
            We are committed to respecting the rights of individuals and comply with applicable South African laws, including the Protection of Personal Information Act (POPIA), as well as principles relating to privacy, dignity, and identity.
          </p>

          <p>
            If you believe that any image or content used by Ayoba Hobo resembles you or infringes on your rights in any way, please contact us at <a href="mailto:legal@drop-selling.com" className="text-gold hover:underline">legal@drop-selling.com</a>, and we will promptly review and address your concern.
          </p>

          <p>
            By engaging with our website and content, you acknowledge and understand that certain visuals are AI-generated and are used as part of our unique brand expression.
          </p>

          <p className="pt-8 font-serif italic text-gold text-xl text-center">
            Ayoba Hobo - Stink Kakula Lekker.
          </p>

        </div>
      </div>
    </main>
  );
}

