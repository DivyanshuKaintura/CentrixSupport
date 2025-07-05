
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const Development = () => {
  return (
    <div>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Cutting-Edge Development
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Building robust digital solutions that power your business growth.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Globe className="w-12 h-12 text-indigo-600" />,
                title: "Web Development",
                description: "Custom websites and web applications built with modern technologies."
              },
              {
                icon: <Smartphone className="w-12 h-12 text-blue-500" />,
                title: "Mobile Development",
                description: "Native and cross-platform mobile applications."
              },
              {
                icon: <Database className="w-12 h-12 text-indigo-600" />,
                title: "Backend Systems",
                description: "Scalable server infrastructure and API development."
              },
              {
                icon: <Code className="w-12 h-12 text-blue-500" />,
                title: "Custom Solutions",
                description: "Tailor-made software solutions for your unique needs."
              }
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Development;