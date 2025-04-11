'use client'

export default function Contact() {
  return (
    <div id="contact" className="scroll-mt-16 container py-10 md:my-20 flex flex-col justify-center space-y-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-green-600 to-green-600 bg-clip-text text-transparent">
        Contactez-nous
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        <div className="flex flex-col space-y-4 justify-center border border-slate-200 rounded-lg p-4">
          <p>Adresse: PADEL15, 115 Rue Castagnary, 75015 Paris, France</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
          <p>Email: contact@padel15.com</p>
        </div>
        <div className="w-full h-64 md:h-[450px] rounded-lg shadow-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.470694110703!2d2.3022233761530275!3d48.82983390271616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671937ac7d32d%3A0x71974bb231b51ad7!2sPADEL%2015!5e1!3m2!1sfr!2ses!4v1744392649571!5m2!1sfr!2ses"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
