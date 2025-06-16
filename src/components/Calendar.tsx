import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import AuthModal from './AuthModal';

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const services = [
  'Strength Training',
  'Weight Loss',
  'Cardio Fitness',
  'Athletic Performance'
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, token } = useAuth();

  useEffect(() => {
    fetchBookedSlots();
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchBookedSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/bookings/all');
      const slots = response.data.bookings.map((booking: any) => 
        `${booking.date}_${booking.time}`
      );
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/bookings');
      setUserBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleBookSlot = (date: string, time: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedSlot({ date, time });
    setShowBookingForm(true);
  };

  const confirmBooking = async () => {
    if (!selectedSlot || !user) return;

    setIsLoading(true);
    try {
      await axios.post('http://localhost:3001/api/bookings', {
        date: selectedSlot.date,
        time: selectedSlot.time,
        service: selectedService
      });

      // Refresh data
      await fetchBookedSlots();
      await fetchUserBookings();
      
      setShowBookingForm(false);
      setSelectedSlot(null);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Booking failed');
    } finally {
      setIsLoading(false);
    }
  };

  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.includes(`${date}_${time}`);
  };

  const isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Training Session</h2>
            <p className="text-xl text-gray-600">Select a date and time that works best for you</p>
            {!user && (
              <p className="text-orange-600 mt-2">Please sign in to book a session</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendar */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <CalendarIcon className="h-6 w-6 mr-2 text-orange-500" />
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && !isDatePast(day) && setSelectedDate(day)}
                    className={`
                      h-12 rounded-lg text-sm font-medium transition-all
                      ${!day ? 'invisible' : ''}
                      ${isDatePast(day!) ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-orange-100'}
                      ${selectedDate && day && formatDate(selectedDate) === formatDate(day) 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white text-gray-900'
                      }
                    `}
                    disabled={!day || isDatePast(day)}
                  >
                    {day?.getDate()}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-orange-500" />
                Available Time Slots
              </h3>
              
              {selectedDate ? (
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map(time => {
                    const dateStr = formatDate(selectedDate);
                    const booked = isSlotBooked(dateStr, time);
                    
                    return (
                      <button
                        key={time}
                        onClick={() => !booked && handleBookSlot(dateStr, time)}
                        className={`
                          p-4 rounded-lg text-sm font-medium transition-all
                          ${booked 
                            ? 'bg-red-100 text-red-600 cursor-not-allowed' 
                            : 'bg-white text-gray-900 hover:bg-orange-100 hover:text-orange-600 shadow-sm hover:shadow-md'
                          }
                        `}
                        disabled={booked}
                      >
                        {time}
                        {booked && <div className="text-xs mt-1">Booked</div>}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Please select a date to view available time slots</p>
                </div>
              )}
            </div>
          </div>

          {/* User Bookings */}
          {user && userBookings.length > 0 && (
            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Upcoming Sessions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBookings.filter(booking => new Date(booking.date) >= new Date()).map(booking => (
                  <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                      <span className="text-orange-500 font-medium">{booking.time}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{booking.service}</p>
                    <p className="text-sm text-gray-500 capitalize">{booking.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Booking</h3>
            <p className="text-gray-600 mb-6">
              {new Date(selectedSlot.date).toLocaleDateString()} at {selectedSlot.time}
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingForm(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? 'Booking...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}