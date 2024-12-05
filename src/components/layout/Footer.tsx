import { FaceBookIcon } from "@/icons/FaceBookIcon"
import { InstaIcon } from "@/icons/InstaIcon"
import { LocationIcon } from "@/icons/LocationIcon"
import { MailIcon } from "@/icons/MailIcon"
import { PhoneIcon } from "@/icons/PhoneIcon"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-950 pt-8 sm:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-primary text-xl sm:text-2xl font-josefin">
              Moga Meat Bar & Grill
            </Link>
            <div className="mt-4 sm:mt-6 flex gap-4">
              <FaceBookIcon className="w-5 sm:w-6 fill-gray-400 hover:fill-primary cursor-pointer transition-colors duration-200" />
              <InstaIcon className="w-5 sm:w-6 stroke-gray-400 hover:stroke-primary cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          <div>
            <h4 className="uppercase text-sm sm:text-base font-semibold mb-4">About Us</h4>
            <p className="text-sm text-gray-400">
              At Moga Meat Bar and Grill, we don't just serve food—we share
              a piece of India's rich culinary heritage. Come and experience
              the difference today!
            </p>
          </div>

          <div>
            <h4 className="uppercase text-sm sm:text-base font-semibold mb-4">Opening Hours</h4>
            <p className="text-sm text-gray-400 mb-2">Sunday - Thursday</p>
            <p className="text-sm text-gray-400 mb-4">11am - 12am</p>
            <p className="text-sm text-gray-400 mb-2">Friday - Saturday</p>
            <p className="text-sm text-gray-400">11am - 2am</p>
          </div>

          {/* Wrapping Services and Have a Question sections together */}
          <div className="sm:col-span-2 lg:col-span-2 grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="uppercase text-sm sm:text-base font-semibold mb-4">Services</h4>
              <div className="grid space-y-2 text-sm text-gray-400">
                <Link href="/" className="inline-flex gap-x-2 hover:text-gray-200 transition-colors duration-200">Dine-In</Link>
                <Link href="/" className="inline-flex gap-x-2 hover:text-gray-200 transition-colors duration-200">Take Out</Link>
                <Link href="/" className="inline-flex gap-x-2 hover:text-gray-200 transition-colors duration-200">Catering Services</Link>
                <Link href="/" className="inline-flex gap-x-2 hover:text-gray-200 transition-colors duration-200">Quick Delivery</Link>
              </div>
            </div>

            <div>
              <h4 className="uppercase text-sm sm:text-base font-semibold mb-4">Have a question?</h4>
              <div className="text-sm text-gray-400">
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <LocationIcon className="w-5 sm:w-6 mt-1 flex-shrink-0" />
                    <span>1560 Dundas St. London Ontario</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <PhoneIcon className="w-5 sm:w-6 flex-shrink-0" />
                    <span>+1 (519) 453-8888</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MailIcon className="w-5 sm:w-6 flex-shrink-0" />
                    <span>londonmogameat@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 sm:pt-6 border-t border-gray-700 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Copyright &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

