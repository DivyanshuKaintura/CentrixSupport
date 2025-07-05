"use client"
import React from "react"
import { motion } from "framer-motion"
import { 
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
} from "lucide-react"

import Navbar from '@/components/nav-bar/page';


const ContactPage = () => {

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-white">
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light mb-6 text-center"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-center max-w-2xl mx-auto"
          >
            We&apos;re here to help. Reach out to our team for assistance.
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Methods */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">nexnovel@gmail.com</p>
              <span className="text-sm text-gray-500 mt-2 block">24/7 Support</span>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+91 93681 52845</p>
              <span className="text-sm text-gray-500 mt-2 block">Mon-Fri 9AM-5PM</span>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600">Chat with our team</p>
              <span className="text-sm text-gray-500 mt-2 block">Available 24/7</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Email Templates Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* <h2 className="text-3xl font-light mb-4">Send Us an Email</h2> */}

          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emailTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => composeEmail(template)}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-black transition-colors duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <template.icon className="w-6 h-6 text-gray-600 group-hover:text-black" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 group-hover:text-black">{template.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-black">
                      <span>Compose email</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Prefer to write us a email? Send us a direct message at:
            </p>
            <a
              href="nexnovel@gmail.com"
              className="inline-flex items-center text-black hover:text-gray-800 font-medium"
            >
              nexnovel@gmail.com
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Location Section */}
      {/* <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light mb-6">Visit Our Store</h2>
                  <p className="text-gray-600 mb-8">
                    Come visit us at our flagship store. We&apos;d love to meet you in person.
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Office Location</h3>
                    <p className="text-gray-600">
                      Road.no:36 ,Jubilee Hills<br />
                      Hyderabad-500033<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday to Friday: 10AM - 8PM<br />
                      saturday and Sunday: 11AM - 7PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Building className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Corporate Office</h3>
                    <p className="text-gray-600">
                      Hyderabad<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm h-[400px] flex items-center justify-center">
                <span className="text-gray-500">Store Map</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </div>
  )
}

export default ContactPage