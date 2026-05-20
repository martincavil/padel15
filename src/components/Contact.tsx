'use client'

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Contact() {
  return (
  <section id="contact" className="scroll-mt-16 container pb-6">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-2xl  font-bold text-[#FF6727]">
        Contactez-nous
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-gray-200 h-80 mb-6 rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.470694110703!2d2.3022233761530275!3d48.82983390271616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671937ac7d32d%3A0x71974bb231b51ad7!2sPADEL%2015!5e1!3m2!1sfr!2ses!4v1744392649571!5m2!1sfr!2ses&z=10"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPinIcon className="w-4 text-[#009F51] mr-3 mt-1" />
            <div>
              <h4 className="font-semibold">Adresse</h4>
              <p className="text-gray-600">
              PADEL15, 115 Rue Castagnary, 75015 Paris, France
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <PhoneIcon className="w-4 text-[#009F51] mr-3 mt-1" />
            <div>
              <h4 className="font-semibold">Téléphone</h4>
              <a href='tel:+33145315876' className="text-gray-600 hover:text-brand transition-colors">+33 1 45 31 58 76</a>
            </div>  
          </div>
          <div className="flex items-start">
            <EnvelopeIcon className="w-4 text-[#009F51] mr-3 mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <a href="mailto:contact@padel15.fr" className="text-gray-600 hover:text-brand transition-colors">contact@padel15.fr</a>
                </div>
          </div>
          <div className="pt-4">
            <h4 className="font-semibold mb-2">Suivez-nous sur nos réseaux sociaux</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/padel15club/?hl=fr"
                className="text-gray-600 hover:text-brand transition-colors cursor-pointer"
              >
                <Image 
                src='/instagram.webp'
                alt='Instagram'
                width={24}
                height={24}
                />
              </a>
              {/* <a
                href="#"
                className="text-gray-600 hover:text-brand transition-colors cursor-pointer"
              >
                <Image 
                src='/facebook.webp'
                alt='facebook'
                width={24}
                height={24}
                />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
