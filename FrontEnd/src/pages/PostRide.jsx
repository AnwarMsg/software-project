import React, { useState, useEffect } from "react";
import "../index.css";

const App = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    origin: "",
    destination: "",
    seats: 1,
    price: "",
    stops: "",
    carModel: "",
    licensePlate: "",
    carColor: "",
    carDescription: "",
    isRecurring: false,
    recurringDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    termsAccepted: false,
  });
  const [carImage, setCarImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [showRecurringOptions, setShowRecurringOptions] = useState(false);
  // Calculate form progress
  useEffect(() => {
    const requiredFields = [
      "date",
      "time",
      "origin",
      "destination",
      "seats",
      "price",
      "carModel",
      "licensePlate",
      "carColor",
      "termsAccepted",
    ];
    const filledFields = requiredFields.filter((field) => {
      if (field === "termsAccepted") return formData[field];
      return formData[field] !== "";
    });
    setFormProgress(
      Math.floor((filledFields.length / requiredFields.length) * 100),
    );
  }, [formData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "isRecurring") {
      setShowRecurringOptions(checked);
    }
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  const handleRecurringDayChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      recurringDays: {
        ...formData.recurringDays,
        [name]: checked,
      },
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setCarImage(file.name);
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.origin) newErrors.origin = "Origin is required";
    if (!formData.destination)
      newErrors.destination = "Destination is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.carModel) newErrors.carModel = "Car model is required";
    if (!formData.licensePlate)
      newErrors.licensePlate = "License plate is required";
    if (!formData.carColor) newErrors.carColor = "Car color is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      alert("Ride posted successfully!");
      // Reset form or redirect
    }
  };
  const handleSaveDraft = () => {
    // Save form data to localStorage or backend
    localStorage.setItem("rideDraft", JSON.stringify(formData));
    alert("Draft saved successfully!");
  };
  const handleCancel = () => {
    // Reset form
    setFormData({
      date: "",
      time: "",
      origin: "",
      destination: "",
      seats: 1,
      price: "",
      stops: "",
      carModel: "",
      licensePlate: "",
      carColor: "",
      carDescription: "",
      isRecurring: false,
      recurringDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      termsAccepted: false,
    });
    setCarImage(null);
    setPreviewImage(null);
    setErrors({});
  };
  const carImageUrl =
    previewImage ||
    "https://readdy.ai/api/search-image?query=Modern%20car%20seen%20from%20the%20side%20with%20a%20clean%20white%20background%2C%20professional%20automotive%20photography%20style%2C%20high%20resolution%2C%20detailed%2C%20realistic%20image%20of%20a%20sedan%20vehicle&width=600&height=400&seq=car1&orientation=landscape";
  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}
    >
      <div
        className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundColor: "#ffffff", minHeight: "100%" }}
      >
        <div className="bg-green-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Post a Ride</h1>
          <p className="mt-2 text-green-100">
            Share your journey with fellow students and staff of Al Akhawayn
            University
          </p>
        </div>
        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-green-700">
                Form Completion
              </span>
              <span className="text-sm font-medium text-green-700">
                {formProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {/* Basic Ride Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Ride Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Departure Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.time ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Origin <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="Enter pickup location"
                    className={`w-full pl-10 pr-4 py-2 border ${errors.origin ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-map-marker-alt text-gray-400"></i>
                  </div>
                </div>
                {errors.origin && (
                  <p className="mt-1 text-sm text-red-500">{errors.origin}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Destination <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Enter drop-off location"
                    className={`w-full pl-10 pr-4 py-2 border ${errors.destination ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-flag-checkered text-gray-400"></i>
                  </div>
                </div>
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.destination}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="seats"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Available Seats <span className="text-red-500">*</span>
                </label>
                <select
                  id="seats"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price per Seat (MAD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-money-bill-wave text-gray-400"></i>
                  </div>
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="stops"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Stops (Optional)
              </label>
              <textarea
                id="stops"
                name="stops"
                value={formData.stops}
                onChange={handleInputChange}
                placeholder="List any stops along the way (e.g., Ifrane Center, Azrou)"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRecurring"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="isRecurring"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  This is a recurring ride
                </label>
              </div>
              {showRecurringOptions && (
                <div className="mt-3 ml-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Select days:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.keys(formData.recurringDays).map((day) => (
                      <div key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          id={day}
                          name={day}
                          checked={formData.recurringDays[day]}
                          onChange={handleRecurringDayChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label
                          htmlFor={day}
                          className="ml-2 block text-sm text-gray-700 capitalize cursor-pointer"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Vehicle Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="carModel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="carModel"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota Corolla 2020"
                  className={`w-full px-4 py-2 border ${errors.carModel ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white`}
                />
                {errors.carModel && (
                  <p className="mt-1 text-sm text-red-500">{errors.carModel}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="licensePlate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  License Plate <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  placeholder="e.g., 123-ABC"
                  className={`w-full px-4 py-2 border ${errors.licensePlate ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white`}
                />
                {errors.licensePlate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.licensePlate}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="carColor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Color <span className="text-red-500">*</span>
                </label>
                <select
                  id="carColor"
                  name="carColor"
                  value={formData.carColor}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.carColor ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a color</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="silver">Silver</option>
                  <option value="gray">Gray</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="brown">Brown</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
                  <option value="other">Other</option>
                </select>
                {errors.carColor && (
                  <p className="mt-1 text-sm text-red-500">{errors.carColor}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="carImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Photo (Optional)
                </label>
                <div className="flex items-center">
                  <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    <i className="fas fa-upload mr-2"></i>
                    {carImage ? "Change Photo" : "Upload Photo"}
                    <input
                      type="file"
                      id="carImage"
                      name="carImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
                {carImage && (
                  <p className="mt-1 text-sm text-gray-500">
                    <i className="fas fa-check-circle text-green-500 mr-1"></i>{" "}
                    {carImage}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="carDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Description (Optional)
              </label>
              <textarea
                id="carDescription"
                name="carDescription"
                value={formData.carDescription}
                onChange={handleInputChange}
                placeholder="Add any additional details about your vehicle that might be helpful for passengers"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
          </div>
          {/* Preview Section */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ride Preview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Journey Details
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-calendar-alt text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.date
                        ? new Date(formData.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Date not set"}
                      {formData.time ? ` at ${formData.time}` : ""}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.origin || "Origin not set"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-flag-checkered text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.destination || "Destination not set"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-users text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.seats} available seat
                      {formData.seats !== 1 ? "s" : ""}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-money-bill-wave text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.price
                        ? `${formData.price} MAD per seat`
                        : "Price not set"}
                    </span>
                  </li>
                  {formData.isRecurring && (
                    <li className="flex items-start">
                      <i className="fas fa-redo text-green-500 mt-1 mr-3 w-5"></i>
                      <span className="text-gray-700">
                        Recurring on:{" "}
                        {Object.entries(formData.recurringDays)
                          .filter(([_, isSelected]) => isSelected)
                          .map(
                            ([day]) =>
                              day.charAt(0).toUpperCase() + day.slice(1),
                          )
                          .join(", ") || "No days selected"}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Vehicle Details
                </h3>
                <div className="mb-4 overflow-hidden rounded-lg bg-white shadow">
                  <img
                    src={carImageUrl}
                    alt="Vehicle"
                    className="h-48 w-full object-cover object-top"
                  />
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-car text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.carModel || "Car model not set"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-id-card text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700">
                      {formData.licensePlate || "License plate not set"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-palette text-green-500 mt-1 mr-3 w-5"></i>
                    <span className="text-gray-700 capitalize">
                      {formData.carColor || "Color not set"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Terms and Conditions */}
          <div className="mb-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer ${errors.termsAccepted ? "border-red-500" : ""}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termsAccepted"
                  className="font-medium text-gray-700 cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="#" className="text-green-600 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-green-600 hover:underline">
                    Safety Guidelines
                  </a>
                </label>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Post Ride
            </button>
          </div>
        </form>
      </div>
      {/* Support Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Need help?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};
export default App;
