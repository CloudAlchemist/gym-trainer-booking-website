import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300">
            Ready to start your fitness journey? Contact me today to discuss your goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-4 rounded-lg">
                <Phone className="h-8 w-8" />
              </div>
              <div>
                <p className="font-medium text-lg">Phone</p>
                <p className="text-gray-300 text-xl">+91 9740130705</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-4 rounded-lg">
                <Mail className="h-8 w-8" />
              </div>
              <div>
                <p className="font-medium text-lg">Email</p>
                <p className="text-gray-300 text-xl">bibhas@everydaystriveliving.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 md:col-span-2">
              <div className="bg-orange-500 p-4 rounded-lg">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <p className="font-medium text-lg">Location</p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  1st Floor, Kukke Plaza, above McDonald's,<br />
                  Bhagyalakshmi Avenue, Rukmaiah Layout,<br />
                  Akshayanagar, Bengaluru, Karnataka 560076
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 md:col-span-2">
              <div className="bg-orange-500 p-4 rounded-lg">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <p className="font-medium text-lg">Hours</p>
                <p className="text-gray-300 text-lg">
                  Mon-Sat: 6:00 AM - 8:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}