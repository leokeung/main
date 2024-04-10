import { Link } from "react-router-dom";
import { useState } from "react";
import Weather from "./Component/Weather.js";
import Inputbox from "./Component/input.js";
import Cart from "./Component/SC.js";
import { item } from "./Component/product";
import { FaCaretDown } from "react-icons/fa";

function Header(props) {
  const temperature = props.temperature;
  const weather = props.weather;
  const [OpenLogin, setOpenLogin] = useState(true);
  function ButtonLink({ to, BtnName }) {
    return <Link to={to}>{BtnName}</Link>;
  }

  const dropdownNames = new Set(item.map((data) => data.bigcategories));
  const dropdownLinks = [...dropdownNames];

  const uniqueSmallCategoriesMap = {};
  dropdownLinks.forEach((bigcategorie) => {
    const smallCategoriesSet = new Set(
      item
        .filter((item) => item.bigcategories === bigcategorie)
        .map((filteredItem) => filteredItem.smallcategories)
    );
    uniqueSmallCategoriesMap[bigcategorie] = Array.from(smallCategoriesSet);
  });

  return (
    <>
      <div className="flex bg-blue-600">
        <ButtonLink
          to="/"
          BtnName={
            <button>
              <img
                src="https://api.pns.hk/medias/PNS-logo-2X.png?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4MDE0fGltYWdlL3BuZ3xhREZsTDJnNU5DOHhNRFl4TmprNU9EazROVGMxT0M5UVRsTmZiRzluYjE4eVdDNXdibWN8Nzg4ODYyOWY1NDEwM2VhMjNkMjJiN2M5ODkxMzQzMjVkYWNkMWQ1NWJhMDk5OWIwZTgzMGViMGE2YzljNTllZQ"
                alt="logo"
              />
            </button>
          }
        />
        <Inputbox />
        <Weather temperature={temperature} weather={weather} />
        {props.Account ? (
          <>
            <div>Welcome,{props.Account}</div>
            <ButtonLink
              to="/"
              BtnName={
                <button
                  className="bg-gray-500"
                  onClick={() => {
                    setOpenLogin(!OpenLogin);
                    props.updateAccountName(null);
                  }}
                >
                  Logout
                </button>
              }
            />
          </>
        ) : (
          <ButtonLink
            to="Account"
            BtnName={<button className="bg-gray-500">Login</button>}
          />
        )}
        <button
          onClick={() => {
            props.updateIsOpenCart(!props.OpenCart);
          }}
        >
          Shopping cart
        </button>
        {props.OpenCart && !props.Account && (
          <div style={{ borderStyle: "solid", width: "300px" }}>
            <h3>Shop Cart</h3>
            <button
              onClick={() => {
                props.updateIsOpenCart(!props.OpenCart);
              }}
            >
              X
            </button>
            <h5>Please Login First !</h5>
          </div>
        )}
        {props.OpenCart && props.Account && (
          <div style={{ borderStyle: "solid", width: "300px" }}>
            <h3>Shop Cart</h3>
            <button
              onClick={() => {
                props.updateIsOpenCart(!props.OpenCart);
              }}
            >
              X
            </button>
            <Cart
              ItemChangeIncart={props.updateCart}
              CartItems={props.CartItem}
              CartAccount={props.Account}
            />
            {props.CartItem[props.Account].length > 0 ? (
              <ButtonLink
                to="Checkout"
                BtnName={
                  <button
                    className="bg-gray-500"
                    onClick={() => {
                      props.updateIsOpenCart(!props.OpenCart);
                    }}
                  >
                    Get Total
                  </button>
                }
              />
            ) : (
              <button className="bg-gray-500">Get Total</button>
            )}
          </div>
        )}
      </div>

      <div className=" shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40 flex justify-evenly">
        {dropdownLinks.map((bigcategorie) => (
          <li
            key={bigcategorie}
            className="list-none group relative cursor-pointer"
          >
            <Link
              to={`/${bigcategorie}`}
              className="flex items-center gap-[2px] py-2"
            >
              {bigcategorie}
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </Link>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {uniqueSmallCategoriesMap[bigcategorie].map(
                  (smallCategory, index) => (
                    <li key={index}>
                      <Link to={`/${bigcategorie}/${smallCategory}`}>
                        {smallCategory}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}

export default Header;
