import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;
  const [menu, setMenu] = useState(false);
  const mainstyle = "px-3 lg:px-10 max-w-[1400px] mx-auto mt-[5px]";
  const singleprop = "px-3 lg:px-10 max-w-[1000px] mx-auto mt-[5px]";
  return (
    <div className="bg-gray-100">
      <header className="py-5 px-3 lg:px-10">
        <nav className="flex justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-semibold text-[20px]">Homes</span>{" "}
            <span className="ml-[4px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="text-black"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </span>
          </Link>
          <div className="hidden md:flex space-x-10">
            <li>
              <Link href="/" className="font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/search" className="font-semibold">
                Search
              </Link>
            </li>
            <li>
              <Link href="/search?purpose=for-rent" className="font-semibold">
                Rent Property
              </Link>
            </li>
            <li>
              <Link href="/search?purpose=for-sale" className="font-semibold">
                Buy property
              </Link>
            </li>
          </div>
          <div className="md:hidden">
            <div onClick={() => setMenu(!menu)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {menu ? (
              <div className="absolute top-[64px] bg-zinc-300/70 backdrop-blur-md right-3 p-3 z-[1000]">
                <li
                  onClick={() => setMenu(false)}
                  className="hover:bg-zinc-400 transition-[hover] duration-300 p-[4px]"
                >
                  <Link href="/" className="px-[5px]">
                    Home
                  </Link>
                </li>
                <li
                  onClick={() => setMenu(false)}
                  className="hover:bg-zinc-400 transition-[hover] duration-300 p-[4px]"
                >
                  <Link href="/search" className="px-[5px]">
                    Search
                  </Link>
                </li>
                <li
                  onClick={() => setMenu(false)}
                  className="hover:bg-zinc-400 transition-[hover] duration-300 p-[4px]"
                >
                  <Link href="/search?purpose=for-rent" className="px-[5px]">
                    Rent Property
                  </Link>
                </li>
                <li
                  onClick={() => setMenu(false)}
                  className="hover:bg-zinc-400 transition-[hover] duration-300 p-[4px]"
                >
                  <Link href="/search?purpose=for-sale" className="px-[5px]">
                    Buy property
                  </Link>
                </li>
              </div>
            ) : null}
          </div>
        </nav>
      </header>
      <main className={`${path === "/property/[id]" ? singleprop : mainstyle}`}>
        {children}
      </main>
      <footer className="px-3 lg:px-10 mt-[70px] py-[30px]">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:w-[40%] mb-8">
            <Link href="/" className="flex items-center mb-3">
              <span className="font-semibold text-[20px]">Homes</span>{" "}
              <span className="ml-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="text-black"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </span>
            </Link>
            <p>
              Our vision is to make all homes <br />
              the best place for you to live
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
            <ul>
              <h3 className="font-semibold text-[20px] mb-3">About</h3>
              <li className="mb-2">About us</li>
              <li className="mb-2">Features</li>
              <li className="mb-2">News & Blog</li>
            </ul>

            <ul>
              <h3 className="font-semibold text-[20px] mb-3">Company</h3>
              <li className="mb-2">How we work</li>
              <li className="mb-2">Capital</li>
              <li className="mb-2">Security</li>
            </ul>

            <ul>
              <h3 className="font-semibold text-[20px] mb-3">Support</h3>
              <li className="mb-2">FAQS</li>
              <li className="mb-2">Support center</li>
              <li className="mb-2">Contact Us</li>
            </ul>

            <ul>
              <h3 className="font-semibold text-[20px] mb-3">Follow us</h3>
              <div className="flex space-x-3">
                <img
                  src="/fb.png"
                  alt="facebook"
                  className="w-6 cursor-pointer"
                />
                <img
                  src="/ig.png"
                  alt="facebook"
                  className="w-6 cursor-pointer"
                />
                <img
                  src="/tw.png"
                  alt="facebook"
                  className="w-6 cursor-pointer"
                />
              </div>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
