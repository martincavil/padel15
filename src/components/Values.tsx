'use client'
import { UserGroupIcon, PuzzlePieceIcon, FaceSmileIcon } from '@heroicons/react/24/solid'

export default function Values() {
  const values = [
    {
      title: "Community",
      description: "We foster a welcoming environment where players of all levels can connect, learn, and share their passion for padel.",
      icon: <UserGroupIcon className="w-10 h-10" />,
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500"
    },
    {
      title: "Accessibility",
      description: "We believe padel should be accessible to everyone...",
      icon: <PuzzlePieceIcon className="w-10 h-10" />,
      bgClass: "bg-green-600/10",
      textClass: "text-green-600"
    },
    {
      title: "Fair Play",
      description: "We promote sportsmanship, respect, and fair play...",
      icon: <FaceSmileIcon className="w-10 h-10" />,
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500"
    },
  ]

  return (
    <section id="values" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl  font-bold text-[#FF6727] mb-6">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div className="text-center group" key={index}>
              <div className="mb-6 text-5xl flex justify-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${value.bgClass} ${value.textClass}`}>
                  {value.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
