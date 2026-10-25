import { Phone, MessageCircle } from 'lucide-react';

// Logo image — replace the file in src/images (update the extension here if it is not .png).
import saiGarageLogo from '../images/sai_garage_logo.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="inline-block bg-white rounded-lg mb-4">
              <img
                src={saiGarageLogo}
                alt="Sai Garage"
                className="h-14 sm:h-16 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Bike, scooter and car repair service. Quick, reliable and affordable.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-black font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#home" className="hover:text-[#E51B12] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#E51B12] transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-[#E51B12] transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-[#E51B12] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-black font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="tel:+917850986841" className="inline-flex items-center gap-2 hover:text-[#E51B12] transition-colors">
                  <Phone className="h-4 w-4 text-[#E51B12]" />
                  +91 78509 86841
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917850986841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#E51B12] transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-[#E51B12]" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Sai Garage. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
