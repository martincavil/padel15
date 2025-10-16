"use client";

// import Image from "next/image";

export default function Clients() {
  // Liste des clients (à remplacer par vos vrais clients)
  const clients = [
    { id: 1, name: "Client 1", logo: "/logos/client1.svg" },
    { id: 2, name: "Client 2", logo: "/logos/client2.svg" },
    { id: 3, name: "Client 3", logo: "/logos/client3.svg" },
    { id: 4, name: "Client 4", logo: "/logos/client4.svg" },
    { id: 5, name: "Client 5", logo: "/logos/client5.svg" },
  ];

  return (
    <section>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12 text-[#FF6727]">
          Ils nous font confiance
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center p-4 h-24 w-full"
            >
              {/* Placeholder coloré en attendant les vrais logos */}
              <div className="bg-gray-200 rounded-md w-full h-full flex items-center justify-center">
                {/* Décommenter cette partie quand vous aurez les logos réels */}
                {/* <Image
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  width={120}
                  height={60}
                  className="max-h-16 object-contain"
                /> */}

                {/* Placeholder de texte - à supprimer quand vous aurez les logos */}
                <span className="text-gray-500 font-medium">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
