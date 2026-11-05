"use client";

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteSettings } from "@/lib/settings";

export default function Contact({ settings, title }: { settings: SiteSettings; title?: ReactNode }) {
  return (
    <section id="contact" className="scroll-mt-16 container pb-6">
      <div className="container mx-auto px-4 space-y-6">
        {title ?? <h2 className="font-bold text-brand">Contactez-nous</h2>}
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
              <MapPinIcon className="w-4 text-green-600 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold">Adresse</h4>
                <p className="text-gray-600">
                  {settings.clubName}, {settings.address}, France
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <PhoneIcon className="w-4 text-green-600 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold">Téléphone</h4>
                <a
                  href={settings.phoneHref}
                  className="text-gray-600 hover:text-brand transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <EnvelopeIcon className="w-4 text-green-600 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-gray-600 hover:text-brand transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="font-semibold mb-2">
                Suivez-nous sur nos réseaux sociaux
              </h4>
              <div className="flex space-x-4">
                <a
                  href={settings.instagramUrl}
                  className="text-gray-600 hover:text-brand transition-colors cursor-pointer"
                >
                  <Image
                    src="/images/autres/instagram.webp"
                    alt="Instagram"
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
