
import { Film, Camera, Music, Video, ArrowRight } from 'lucide-react';

const Media = () => {
  return (
    <div>
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Compelling Media Production
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Create engaging content that tells your story and captures your audience.
          </p>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: <Video className="w-10 h-10 text-purple-600" />,
                title: "Video Production",
                description: "Professional video content for marketing, training, and entertainment."
              },
              {
                icon: <Camera className="w-10 h-10 text-red-500" />,
                title: "Photography",
                description: "High-quality photography for products, events, and brand storytelling."
              },
              {
                icon: <Film className="w-10 h-10 text-purple-600" />,
                title: "Animation",
                description: "2D and 3D animation for explainer videos and visual content."
              },
              {
                icon: <Music className="w-10 h-10 text-red-500" />,
                title: "Audio Production",
                description: "Professional audio recording, editing, and sound design."
              }
            ].map((service) => (
              <div key={service.title} className="relative p-8 border-2 border-gray-200 rounded-lg group hover:border-purple-500 transition-colors">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Media;