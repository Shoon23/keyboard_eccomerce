import React, { useState } from "react";
import { Search, Person, Cart, List, X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

interface Props {
  isHeroInView: boolean;
}

function Headers({ isHeroInView }: Props) {
  const userId = useAuthStore((state) => state.userId);
  const firstName = useAuthStore((state) => state.firstName);
  const lastName = useAuthStore((state) => state.lastName);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const navMenu = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Products",
      route: "products",
    },
  ];
  const [isShowNav, setIsShowNav] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  return (
    <header
      className={`${
        !isHeroInView
          ? `fixed top-0 z-10 ml-4 mt-2 h-20 w-11/12 rounded-xl bg-white text-black drop-shadow-2xl md:ml-8 lg:ml-16`
          : `h-20 bg-sky-600 text-white`
      }`}
    >
      <nav className="flex h-full items-center justify-between p-10 duration-300 ease-in">
        {/*  Mobile Navigation Hamburger Start*/}
        <div
          className="lg:hidden"
          onClick={() => setIsShowNav((prev) => !prev)}
        >
          <List className="h-8 w-8 cursor-pointer hover:text-black" />
        </div>
        {/*  Mobile Navigation Hamburger End*/}

        {/*  Mobile Navigation Hamburger Items Start*/}
        <div
          className={`${
            isShowNav
              ? "fixed top-0 left-0 z-10  flex h-screen w-9/12 flex-col bg-white"
              : "hidden"
          }`}
        >
          <div className="flex w-full justify-between  p-3">
            <Link
              to={userId ? `/profile` : `/login`}
              onClick={() => setIsShowNav(false)}
              className="flex items-center"
            >
              <Person className="h-10 w-10 cursor-pointer fill-black duration-300 ease-in hover:text-black" />
              <h1 className="text-lg text-black">
                {userId ? firstName + " " + lastName : "Login"}
              </h1>
            </Link>
            <X
              onClick={() => setIsShowNav((prev) => !prev)}
              className="h-10 w-10 cursor-pointer fill-black "
            />
          </div>
          <ul className="flex flex-col gap-2 p-3">
            {navMenu.map(
              (navMenu: { name: string; route: string }, idx: number) => (
                <li key={idx}>
                  <Link
                    onClick={() => setIsShowNav(false)}
                    to={navMenu.route}
                    className="text-lg text-black duration-300 ease-in "
                  >
                    {navMenu.name}
                  </Link>
                </li>
              )
            )}
            {isAdmin && (
              <li>
                <Link
                  onClick={() => setIsShowNav(false)}
                  to={"/admin/home"}
                  className="text-lg text-black duration-300 ease-in "
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/*  Mobile Navigation Hamburger Items End*/}
        {/* Logo Start */}
        <Link to={"/"} className="text-lg md:text-2xl">
          Keyboard
        </Link>
        {/* Logo End */}

        {/* Search Bar Start */}
        {isSearch && (
          <div className="absolute flex h-12 w-4/5 place-items-center gap-2 rounded-md bg-white p-2 shadow-md	md:w-11/12">
            <div className="">
              <Search className="h-full w-7 cursor-pointer fill-black" />
            </div>
            <input
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="w-full text-black outline-none"
              placeholder="Search Products"
              type="text"
            />
            <div className="">
              <X
                onClick={() => setIsSearch(false)}
                className="h-10 w-10 cursor-pointer fill-black"
              />
            </div>
          </div>
        )}
        {/* Search Bar End */}

        {/*  Deskstop Navigation Start*/}
        <ul className="hidden gap-4 lg:flex ">
          {navMenu.map(
            (navMenu: { name: string; route: string }, idx: number) => (
              <li key={idx}>
                <Link
                  onClick={() => setIsShowNav(false)}
                  to={navMenu.route}
                  className="text-lg duration-300 ease-in hover:text-black"
                >
                  {navMenu.name}
                </Link>
              </li>
            )
          )}
          {isAdmin && (
            <li>
              <Link
                onClick={() => setIsShowNav(false)}
                to={"/admin/home"}
                className="text-lg duration-300 ease-in hover:text-black"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
        <ul className=" flex gap-3">
          <li>
            <button onClick={() => setIsSearch(true)}>
              <Search className="h-6 w-6 cursor-pointer duration-300 ease-in hover:text-black" />
            </button>
          </li>
          <li className="hidden lg:block">
            <Link to={userId ? "/profile" : "login"}>
              <Person className="h-6 w-6 cursor-pointer duration-300 ease-in hover:text-black" />
            </Link>
          </li>
          <li>
            <Link to={"/cart"}>
              <Cart className="h-6 w-6 cursor-pointer duration-300 ease-in hover:text-black" />
            </Link>
          </li>
        </ul>
        {/*  Deskstop Navigation End*/}
      </nav>
    </header>
  );
}

export default Headers;
