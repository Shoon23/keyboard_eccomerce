import React from "react";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { usePageRef } from "../../hooks/usePageRef";
interface Props {}
function Navbar({}: Props) {
  const navigation = [
    {
      name: "Orders",
      path: "/admin/home",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
  ];
  const { pageRef } = usePageRef();

  return (
    <main>
      <header className="flex place-items-center gap-36">
        <Link
          to={"/admin/home"}
          className="my-4 cursor-pointer text-4xl text-white "
        >
          Admin Dashboard
        </Link>

        <nav className="">
          <ul className="flex gap-1 text-lg text-white">
            {navigation.map(
              (nav: { name: string; path: string }, idx: number) => (
                <Link to={nav.path} className="cursor-pointer">
                  {nav.name}
                </Link>
              )
            )}
          </ul>
        </nav>
      </header>
      <section className="my-2">
        <div className="flex h-12 place-items-center gap-2 rounded-md bg-white p-2 shadow-md">
          <div className="">
            <Search className="h-full w-7 cursor-pointer fill-black" />
          </div>
          <input
            className="w-full text-black outline-none"
            placeholder="Search User"
            type="text"
          />
        </div>
      </section>
      <Outlet context={{ pageRef }} />
    </main>
  );
}

export default Navbar;
