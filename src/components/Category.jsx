import React from "react";
import { NavLink } from "react-router-dom";
const data = [
  {
    title: "Company-Profile",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "My-Profile",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Beach",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Waterfall",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Cabin",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Sunflowers",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Starry",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Rural",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Bridge",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Desert",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Autumn",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Sailboats",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Moonlit",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Aurora",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Lavender",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Misty",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Lighthouse",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Balloons",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Lake",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Ruins",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
  {
    title: "Harbor",
    image_url:
      "https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg",
  },
];

export const Category = () => {
  return (
    <div className="container mx-auto p-1 w-[49%]">
      <div className="grid grid-cols-4 gap-3">
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={`/${item.title.toLowerCase()}/overview`}
            className="rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 bg-white rounded-b-lg">
                <h1 className="text-lg font-semibold text-center mb-2">
                  {item.title}
                </h1>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
