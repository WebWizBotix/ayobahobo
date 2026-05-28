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

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center pt-32 pb-24 px-6">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <div className="border-b border-white/10 pb-8 mb-4 lg:mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Terms & Conditions</h1>
          <p className="text-white/40 tracking-widest uppercase text-xs md:text-sm mt-4">Ayoba Hobo/Drop-Selling International</p>
        </div>
        
        <div className="text-white/80 font-light text-sm md:text-base leading-relaxed space-y-12">
          
          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">1. General</h2>
            <div className="space-y-2">
              <p>1.1 These Terms and Conditions govern all purchases made from Ayoba Hobo/Drop-Selling International.</p>
              <p>1.2 By purchasing any product, you agree to be bound by these terms.</p>
              <p>1.3 These terms comply with applicable South African consumer laws, including the CPA.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">2. Products</h2>
            <div className="space-y-2">
              <p>2.1 All perfumes sold are cosmetic fragrance products intended for external use only.</p>
              <p>2.2 Product descriptions, images, and specifications are provided as accurately as possible but may vary slightly.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">3. Orders & Payment</h2>
            <div className="space-y-2">
              <p>3.1 Full payment is required before any order is processed or dispatched.</p>
              <p>3.2 Accepted payment methods include EFT, card payments, or any other method offered.</p>
              <p>3.3 Orders are only confirmed once payment reflects in our account.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-gold mb-4">4. Use of Products (Important Caution)</h2>
            <div className="space-y-2">
              <p>4.1 Our perfumes contain alcohol-based ingredients and fragrance compounds.</p>
              <p>4.2 Customers must:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Perform a patch test before first use</li>
                <li>Avoid contact with eyes and sensitive areas</li>
                <li>Keep products away from open flames (flammable)</li>
              </ul>
              <p>4.3 Ayoba Hobo/Drop-Selling International is not liable for allergic reactions or misuse of products.</p>
              <p>4.4 Discontinue use immediately if irritation occurs and seek medical advice if necessary.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">5. Returns Policy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white/90 mb-2">5.1 General Returns</h3>
                <ul className="list-disc pl-6 space-y-1">
                   <li>Returns are only accepted in accordance with the CPA.</li>
                   <li>Products must be unused, unopened, and in original packaging.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-2">5.2 Hygiene & Safety Restriction</h3>
                <p className="pl-6 border-l border-white/20 ml-2">Due to hygiene reasons, opened perfumes cannot be returned unless defective.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-2">5.3 Change of Mind</h3>
                <ul className="list-disc pl-6 space-y-1">
                   <li>Returns for change of mind are not guaranteed by law and may be refused.</li>
                   <li>If accepted, return shipping costs will be for the customer.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">6. Defective or Damaged Products</h2>
            <div className="space-y-2">
              <p>6.1 Customers may return defective products within 14 days of purchase.</p>
              <p>6.2 A defect includes manufacturing faults or product failure under normal use.</p>
              <p>6.3 Customers may choose: a replacement or a repair (if applicable).</p>
              <p>6.4 The following are not considered defects:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Damage due to misuse, negligence, or improper storage</li>
                <li>Normal wear and tear</li>
                <li>Allergic reactions (as skin sensitivity varies)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">7. Incorrect Orders</h2>
            <div className="space-y-2">
               <p>7.1 If you receive the wrong product, notify us within 48 hours of delivery.</p>
               <p>7.2 We will arrange collection and replacement at no additional cost.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">8. Refund Policy</h2>
            <div className="space-y-6">
              <p>8.1 Refunds will be processed once the returned item has been inspected.</p>
              <p>8.2 Refunds will be made using the original payment method.</p>
              <div>
                <h3 className="font-semibold text-white/90 mb-2">8.3 Bank Charges</h3>
                <p className="pl-6 border-l border-white/20 ml-2">Any bank charges, transaction fees, or payment gateway fees incurred during the original transaction may be deducted from the refund where applicable.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-2">8.4 Processing Time</h3>
                <p className="pl-6 border-l border-white/20 ml-2">Refunds may take 5-10 business days to reflect, depending on your bank.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">9. Delivery</h2>
            <div className="space-y-2">
               <p>9.1 Delivery timelines are estimates and may vary.</p>
               <p>9.2 Risk passes to the customer upon delivery.</p>
               <p>9.3 Customers must inspect goods upon delivery and report issues promptly.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">10. Limitation of Liability</h2>
            <div className="space-y-2">
              <p>10.1 Ayoba Hobo/Drop-Selling International shall not be liable for:</p>
              <ul className="list-disc pl-6 space-y-1">
                 <li>Indirect or consequential damages</li>
                 <li>Loss resulting from misuse of products</li>
                 <li>Allergic or adverse skin reactions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">11. Privacy</h2>
            <div className="space-y-2">
               <p>11.1 Customer information will be handled in accordance with applicable data protection laws in South Africa, including POPIA.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">12. Amendments</h2>
            <div className="space-y-2">
               <p>12.1 We reserve the right to amend these Terms and Conditions at any time without prior notice.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-widest uppercase text-white mb-4">13. Governing Law</h2>
            <div className="space-y-2">
               <p>13.1 These Terms and Conditions are governed by the laws of South Africa.</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

