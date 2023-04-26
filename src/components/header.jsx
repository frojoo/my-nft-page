import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import axios from "axios";

function Header({ account, setAccount }) {
  const [coinPrice, setCoinPrice] = useState("");

  const onClickAcocunt = async () => {
    try {
      const connectAccount = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(connectAccount[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH"
      );

      setCoinPrice([
        { symbol: "BTC", price: response.data[0].trade_price },
        { symbol: "ETH", price: response.data[1].trade_price },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPrice();
  }, []);
  return (
    <header className="flex justify-between max-w-screen-xl mx-auto p-4 font-bold">
      <Link to="/">
        <button className="flex items-center">
          <div className="relative mr-1">
            <img
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6"
              src={`${process.env.PUBLIC_URL}/images/marshmello.png`}
              alt="logo"
            />
            <div className="w-9 h-9 bg-white rounded-full"></div>
          </div>
          <div className="text-xl">MARSHMELLO</div>
        </button>
      </Link>
      <div className="flex items-center">
        {coinPrice &&
          coinPrice.map((v, i) => {
            return (
              <div key={i} className="text-slate-100 ml-2">
                {v.symbol}: {v.price.toLocaleString()}￦
              </div>
            );
          })}
        {account ? (
          <div className="bg-slate-800 rounded-full p-2 flex items-center pointer-events-none ml-4">
            <div className="bg-gray-300 w-6 h-6 rounded-full flex justify-center items-center">
              <BiWallet size={20} color="navy" />
            </div>
            <div className="ml-1">
              {account.substring(0, 5)}...
              {account.substring(account.length - 4)}
            </div>
          </div>
        ) : (
          <button
            className="bg-slate-800 rounded-full p-2 flex items-center hover:bg-opacity-80"
            onClick={onClickAcocunt}
          >
            <div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
              <BiWallet size={20} color="navy" />
            </div>
            <div className="ml-1">Connect</div>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
