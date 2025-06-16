import React from 'react';
import { Zap, Target, Heart, Trophy } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Strength Training',
    description: 'Build muscle and increase power with targeted strength training programs.'
  },
  {
    icon: Target,
    title: 'Weight Loss',
    description: 'Achieve your weight loss goals with personalized nutrition and exercise plans.'
  },
  {
    icon: Heart,
    title: 'Cardio Fitness',
    description: 'Improve cardiovascular health and endurance with dynamic workout routines.'
  },
  {
    icon: Trophy,
    title: 'Athletic Performance',
    description: 'Enhance sports performance with sport-specific training techniques.'
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of personal training services, 
            each designed to help you achieve your specific fitness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <service.icon className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-height-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}