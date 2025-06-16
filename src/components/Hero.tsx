import React from 'react';
import { Award, Users } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transform Your Body with
              <span className="text-orange-500 block">Expert Training</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get personalized fitness training from a certified professional. 
              Achieve your fitness goals with customized workout plans and expert guidance.
            </p>
            <button
              onClick={onBookNow}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Your Session
            </button>
            
            <div className="flex items-center space-x-12 mt-12">
              <div className="text-center">
                <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Certified Trainer</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">100+ Clients</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional Trainer"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <p className="font-semibold">Bibhas Dastidar</p>
                <p className="text-sm text-gray-600">Certified Personal Trainer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}