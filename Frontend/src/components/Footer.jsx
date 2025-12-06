import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Definición de color esmeralda para usar en las clases (simulando que está en tailwind.config.js)
// Aquí lo usamos directamente con sintaxis de color arbitrario de Tailwind: text-[#00A36C]

const Footer = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  
  // Función para obtener y formatear la hora actual y la fecha
  useEffect(() => {
    const updateTime = () => {
      // Configuraciones regionales para mostrar la hora en Colombia/Bogotá
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/Bogota", // Ubicación del usuario (Bogotá, Colombia)
      };
      
      const timeString = new Date().toLocaleTimeString("es-CO", options);
      setCurrentTime(timeString);
    };

    // Actualiza inmediatamente y luego cada segundo
    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId); // Limpia el intervalo al desmontar
  }, []);

  const handleReload = () => {
    if (window.location.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  return (
    <footer className="w-full bg-white text-gray-700 pt-16 md:pt-20 lg:pt-24 px-4 sm:px-8 xl:px-20 mx-auto max-w-[1800px]">
      <hr className="border-gray-200" />
      
      {/* Sección principal de enlaces y responsividad mejorada */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 md:py-16">
        
        {/* Columna 1: Our Company */}
        <div className="col-span-1">
          <h2 className="font-bold text-xl md:text-2xl text-[#00A36C] mb-4">
            Our Company
          </h2>
          <p className="text-sm hover:text-[#00A36C] transition duration-200 cursor-pointer mt-2">
            About Us
          </p>
          <p className="text-sm hover:text-[#00A36C] transition duration-200 cursor-pointer mt-2">
            Our Fundamentals
          </p>
          <p className="text-sm hover:text-[#00A36C] transition duration-200 cursor-pointer mt-2">
            Our Team
          </p>
        </div>
        
        {/* Columna 2: Important Links (Se mueve aquí para balancear el layout en mobile/tablet) */}
        <div className="col-span-1">
          <h2 className="font-bold text-xl md:text-2xl text-[#00A36C] mb-4">
            Important Links
          </h2>
          <p
            onClick={handleReload}
            className="cursor-pointer text-sm hover:text-[#00A36C] transition duration-200 mt-2"
          >
            Home
          </p>
          <Link to="/our-menu/main">
            <p className="text-sm hover:text-[#00A36C] transition duration-200 mt-2">
              Our Menu
            </p>
          </Link>
          <Link to="/merchandise">
            <p className="text-sm hover:text-[#00A36C] transition duration-200 mt-2">
              Our Merchandise
            </p>
          </Link>
        </div>

        {/* Columna 3: Contact Us */}
        <div className="col-span-1">
          <h2 className="font-bold text-xl md:text-2xl text-[#00A36C] mb-4">
            Contact Us
          </h2>
          <Link to="/contact">
            <p className="text-sm hover:text-[#00A36C] transition duration-200 mt-2">
              Let's Talk
            </p>
          </Link>
        </div>

        {/* Columna 4: News & Events */}
        <div className="col-span-1">
          <h2 className="font-bold text-xl md:text-2xl text-[#00A36C] mb-4">
            News & Events
          </h2>
          <Link to="/allnews">
            <p className="text-sm hover:text-[#00A36C] transition duration-200 mt-2">
              News & Events
            </p>
          </Link>
        </div>

        {/* Columna 5 (o final en grid): Redes Sociales */}
        <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col items-start lg:items-end mt-4 lg:mt-0">
            <h2 className="font-bold text-xl md:text-2xl text-[#00A36C] mb-4">
                Follow Us
            </h2>
            <div className="flex items-center gap-3">
            {/* Íconos de redes sociales con estilo moderno y hover esmeralda */}
            {[
              { Icon: FaFacebookF, href: "https://www.facebook.com/letsfalafelofficial" },
              { Icon: FaInstagram, href: "https://www.instagram.com/letsfalafelofficial/" },
              { Icon: FaLinkedinIn, href: "" }, // Enlace vacío para LinkedIn
              { Icon: FaTwitter, href: "" },
            ].map(({ Icon, href }, index) => (
              <div 
                key={index}
                className="h-10 w-10 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer 
                          hover:bg-[#00A36C] hover:border-[#00A36C] hover:text-white transition-all duration-300"
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="text-lg" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      <hr className="border-gray-200" />

      {/* Sección de Políticas, Copyright y Créditos */}
      <div className="flex flex-col md:flex-row md:justify-between items-center py-6 text-sm md:text-base">
        
        {/* Políticas */}
        <div className="flex flex-col sm:flex-row items-center gap-4 order-3 md:order-1 mt-4 md:mt-0">
          <p className="hover:text-[#00A36C] transition duration-200 cursor-pointer">
            Privacy Policy
          </p>
          <p className="hover:text-[#00A36C] transition duration-200 cursor-pointer">
            Terms of Use
          </p>
        </div>

        {/* Copyright y Reloj */}
        <div className="flex flex-col sm:flex-row items-center gap-4 order-1 md:order-2">
            <p>© 2025 Emeralds DT.</p>
            <p className="font-medium text-[#00A36C] flex gap-2">
                <span className="hidden sm:inline">|</span>
                Hora Actual: **{currentTime}**
            </p>
        </div>

        <div className="order-2 md:order-3 mt-4 md:mt-0">
          <p className="text-center">
            Managed by
            <a
              href="https://manuelnieto.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-[#00A36C] hover:text-emerald-700 cursor-pointer font-bold ml-1 transition duration-200"
            >
              NietoDeveloper
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;