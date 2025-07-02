import { FaWhatsapp } from "react-icons/fa";
import { MdLocationOn, MdOutlinePhoneAndroid } from "react-icons/md";
import { SiFacebook, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#eeeef5] text-gray-600 text-sm pt-6 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-center md:text-left">
            <div className="font-bold text-gray-800 text-base md:text-lg">
              Book Manager
            </div>
          </div>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="hover:text-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiFacebook className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-pink-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiInstagram className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://www.whatsapp.com/"
              className="hover:text-blue-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>

          <div className="text-gray-700 text text-xs font-bold md:text-sm flex flex-col gap-1">
            <p className="flex items-center gap-1">
              <MdLocationOn className="text-lg" />
              <a
                href="https://maps.google.com/?q=123+Book+St,+Library+City,+BK+56789"
                className="hover:underline"
              >
                14-Munshipara, Sylhet, Bangladesh
              </a>
            </p>
            <p className="flex items-center gap-1">
              <MdOutlinePhoneAndroid className="text-lg" />
              <a href="tel:+8801768968938" className="hover:underline">
                +880 1768 968 938
              </a>
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-300">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
