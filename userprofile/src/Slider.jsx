// Slider.jsx
import React from 'react';
import './App.css';

const Slider = () => {
    return (
        <div className="bg-yellow-100 rounded-lg shadow-md p-4 w-80 h-64 overflow-hidden"> {/* Card size */}
            <div className="overflow-x-auto hide-scrollbar">
                <div className="flex justify-between items-center mb-4 border-b pb-2 w-max">
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-baby-carriage"></i>
                        <span className="text-sm">Don't have children</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-baby-carriage"></i>
                        <span className="text-sm">Don't want children</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-user"></i>
                        <span className="text-sm">Age: 25</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-map-marker-alt"></i>
                        <span className="text-sm">Location: New York</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-globe"></i>
                        <span className="text-sm">Ethnicity: Asian</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-cannabis"></i>
                        <span className="text-sm">Drugs: Never</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-smoking"></i>
                        <span className="text-sm">Marijuana: Sometimes</span>
                    </div>
                    <div className="flex flex-col items-center mr-4 text-yellow-900">
                        <i className="fas fa-smoking-ban"></i>
                        <span className="text-sm">Smoke: Everyday</span>
                    </div>
                    <div className="flex flex-col items-center text-yellow-900">
                        <i className="fas fa-wine-glass-alt"></i>
                        <span className="text-sm">Drink: Sometimes</span>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center border-b pb-2 text-yellow-900">
                    <i className="fas fa-briefcase mr-2"></i>
                    <span>No at No</span>
                </div>
                <div className="flex items-center border-b pb-2 text-yellow-900">
                    <i className="fas fa-graduation-cap mr-2"></i>
                    <span>Sd college</span>
                </div>
                <div className="flex items-center border-b pb-2 text-yellow-900">
                    <i className="fas fa-book mr-2"></i>
                    <span>Hindu</span>
                </div>
                <div className="flex items-center border-b pb-2 text-yellow-900">
                    <i className="fas fa-home mr-2"></i>
                    <span>Darjeeling</span>
                </div>
                <div className="flex items-center text-yellow-900">
                    <i className="fas fa-search mr-2"></i>
                    <span>Long-term relationship</span>
                </div>
            </div>
        </div>
    );
};

export default Slider;
