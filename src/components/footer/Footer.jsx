import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  const info = {
    socialMedia: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
        icon: FaFacebookSquare,
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/",
        icon: FaYoutube,
      },
      {
        name: "Twitter",
        url: "https://x.com/",
        icon: FaTwitter,
      },
      {
        name: "Pinterest",
        url: "https://www.pinterest.com/",
        icon: FaPinterest,
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
        icon: FaInstagram,
      },
    ],
    nav: [
      {
        name: "Nosotros",
        url: "#",
      },
      {
        name: "Comercial",
        url: "#",
      },
      {
        name: "Soporte",
        url: "#",
      },
      {
        name: "FAQ's",
        url: "#",
      },
    ],
  };
  return (
    <footer className="bg-gradient-to-r from-main-blue to-[#0D1D6C] flex justify-evenly items-center text-white font-medium border-t-4 border-orange-700">
      <nav className="flex justify-between">
        <section className="flex flex-col items-center">
          <img src="/logo-picados-ya.png" className="w-34 h-16" />
          <ul className="flex mt-6">
            {info.socialMedia.map((social) => (
              <li key={social.name} className="mx-1">
                <a href={social.url} target="_blank">
                  <social.icon className="text-xl" />
                </a>
              </li>
            ))}
          </ul>
        </section>
        <ul className="ml-16">
          {info.nav.map((item) => (
            <li key={item.name} className="my-1.5">
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <img src="/image 44.png" className="mt-2" />
      <div
        className="flex flex-col items-center
      "
      >
        <button className="bg-gradient-to-r from-orange-dark to-orange-light rounded-[25px] border-solid border-[#ffffff35] border-[3px] font-bold  transition-colors px-16 py-2">
          Contacto
        </button>
        <p className="text-gray-300 text-xs flex mt-9">
          Copyright © <img src="/image 39.png" className="relative bottom-1" />
          2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
