import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from '@/public/white_logo.svg';
import Link from "next/link";
import { useRouter } from "next/router";
import { SignOutButton, SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

const Header = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <div className="bg-[#1A1A1A] fixed z-50 flex flex-row justify-between flex-wrap top-0 rounded-b-[18px] w-full h-[76px] lg:h-[99px]">
      <div className="w-full z-[50000] max-w-[74.25px] h-6 mx-auto mt-[30px] lg:ml-[103px] lg:mt-[38px] lg:mx-0 lg:max-w-[109.96px] lg:h-[36px]">
        <Link href="/">
          <img src={Logo.src} alt="" />
        </Link>
      </div>
      <div className="lg:mr-[146px]">
        <div className="absolute top-0 bottom-0 z-50 flex items-center justify-end w-full right-4 lg:hidden">
          {sidebarOpen ? (
            <IoMdClose onClick={toggleSidebar} className="cursor-pointer text-[24px] text-white" />
          ) : (
            <HiMenuAlt2 onClick={toggleSidebar} className="cursor-pointer text-[24px] text-white" />
          )}
        </div>
        <div
          id="marker"
          className="hidden transition_0_5s absolute left-0 h-1 w-0 bg-[#fdae5c] bottom-0 rounded lg:block"
        ></div>
        <nav
          id="navBar"
          className={`transition_1s flex bg-[#1A1A1A] flex-wrap fixed ${
            sidebarOpen ? 'right-0' : 'right-[-260px]'
          } flex-col max-w-[243px] w-full items-start top-0 space-y-[31px] h-screen lg:right-0 lg:items-center lg:justify-evenly lg:max-w-[100%] lg:space-x-16 lg:space-y-0 lg:static lg:h-full lg:flex-row`}
        >
          <li className="active flex space-x-[16.93px] ml-[33px] mt-[107px] font-semibold text-white list-none text-sm lg:block lg:space-x-0 lg:ml-0 lg:mt-0 lg:text-base">
            <svg
              className="lg:hidden"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M17.5244 10.5833V18.8333H12.941V13.3333H9.27438V18.8333H4.69105V10.5833H3.40771L11.1077 3.61664L18.8077 10.5833H17.5244Z"
                fill="white"
              ></path>
              <path
                d="M18.4411 19.75H12.0244V14.25H10.1911V19.75H3.77441V11.5H1.02441L11.1077 2.42499L21.1911 11.5H18.4411V19.75ZM13.8577 17.9167H16.6077V9.84999L11.1077 4.89999L5.60775 9.84999V17.9167H8.35775V12.4167H13.8577V17.9167Z"
                fill="white"
              ></path>
            </svg>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="flex space-x-[16.93px] ml-[33px] font-semibold text-white list-none text-sm lg:block lg:space-x-0 lg:ml-0 lg:mt-0 lg:text-base">
            <svg
              className="lg:hidden"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M19.2499 17.9166H2.74992C2.19992 17.9166 1.83325 17.55 1.83325 17V5.99998C1.83325 5.44998 2.19992 5.08331 2.74992 5.08331H19.2499C19.7999 5.08331 20.1666 5.44998 20.1666 5.99998V17C20.1666 17.55 19.7999 17.9166 19.2499 17.9166Z"
                fill="white"
              ></path>
              <path
                d="M19.2501 18.8334H2.75008C1.74175 18.8334 0.916748 18.0084 0.916748 17V6.00002C0.916748 4.99169 1.74175 4.16669 2.75008 4.16669H19.2501C20.2584 4.16669 21.0834 4.99169 21.0834 6.00002V17C21.0834 18.0084 20.2584 18.8334 19.2501 18.8334ZM2.75008 6.00002V17H19.2501V6.00002H2.75008Z"
                fill="white"
              ></path>
              <path
                d="M4.58325 8.75H10.0833V10.5833H4.58325V8.75ZM4.58325 12.4167H9.16658V14.25H4.58325V12.4167ZM14.1166 9.39167C14.1166 8.38333 14.6666 8.29167 14.8499 8.29167C15.0333 8.29167 15.5833 8.475 15.5833 9.75833H17.3249C17.3249 7.375 15.6749 7.00833 15.3999 6.91667V6H14.4833V6.91667C14.2083 6.91667 12.4666 7.28333 12.4666 9.39167C12.4666 12.4167 15.6749 11.5917 15.6749 13.6083C15.6749 14.6167 15.0333 14.6167 14.8499 14.6167C14.7583 14.6167 13.9333 14.7083 13.9333 13.15H12.1916C12.1916 15.8083 14.1166 15.9917 14.3916 16.0833V17H15.3083V16.0833C15.5833 16.0833 17.4166 15.7167 17.4166 13.6083C17.2333 10.675 14.1166 11.225 14.1166 9.39167Z"
                fill="white"
              ></path>
            </svg>
            <Link href="/earnings">Earnings</Link>
          </li>
          <li className="flex space-x-[16.93px] ml-[33px] font-semibold text-white list-none text-sm lg:block lg:space-x-0 lg:ml-0 lg:mt-0 lg:text-base">
            <svg
              className="lg:hidden"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0001 4.16669C9.48116 4.16669 8.25008 5.39777 8.25008 6.91669C8.25008 8.4356 9.48116 9.66669 11.0001 9.66669C12.519 9.66669 13.7501 8.4356 13.7501 6.91669C13.7501 5.39777 12.519 4.16669 11.0001 4.16669ZM18.3334 18.8334H3.66675V17.4584C3.66675 15.6874 8.10433 14.25 11.0001 14.25C13.8958 14.25 18.3334 15.6874 18.3334 17.4584V18.8334Z"
                stroke="white"
                stroke-width="2"
              ></path>
              <path
                opacity="0.3"
                d="M11.0001 4.16669C9.48116 4.16669 8.25008 5.39777 8.25008 6.91669C8.25008 8.4356 9.48116 9.66669 11.0001 9.66669C12.519 9.66669 13.7501 8.4356 13.7501 6.91669C13.7501 5.39777 12.519 4.16669 11.0001 4.16669ZM18.3334 18.8334H3.66675V17.4584C3.66675 15.6874 8.10433 14.25 11.0001 14.25C13.8958 14.25 18.3334 15.6874 18.3334 17.4584V18.8334Z"
                fill="white"
              ></path>
            </svg>
            <Link href="/profile">Profile</Link>
          </li>
          <SignOutButton>
            <button className="flex gap-x-4">
              <li className="flex space-x-[16.93px] ml-[33px] font-semibold text-white list-none text-sm lg:block lg:space-x-0 lg:ml-0 lg:mt-0 lg:text-base">
                <svg
                  className="lg:hidden"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2032_3372)">
                    <path
                      d="M18.3333 15.1666V12.4166H10.0833V10.5833H18.3333V7.83331L21.9999 11.5L18.3333 15.1666Z"
                      fill="white"
                    ></path>
                    <path
                      d="M16.5 8.74998V4.16665C16.5 3.15373 15.6796 2.33331 14.6667 2.33331H7.33333C6.32042 2.33331 5.5 3.15373 5.5 4.16665V18.8333C5.5 19.8462 6.32042 20.6666 7.33333 20.6666H14.6667C15.6796 20.6666 16.5 19.8462 16.5 18.8333V14.25H14.6667V18.8333H7.33333V4.16665H14.6667V8.74998H16.5Z"
                      fill="white"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M14.6667 19.75H6.41675V3.25H14.6667C15.6797 3.25 16.5001 4.07042 16.5001 5.08333V17.9167C16.5001 18.9296 15.6797 19.75 14.6667 19.75Z"
                      fill="white"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_2032_3372">
                      <rect
                        width="22"
                        height="22"
                        fill="white"
                        transform="translate(0 0.5)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-[#fff] text-[16px]">Sign out</p>
              </li>
            </button>
          </SignOutButton>
        </nav>
      </div>
    </div>
  );
};

export default Header;
