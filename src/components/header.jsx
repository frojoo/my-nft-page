import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";

function Header({ account, setAccount }) {
  const [coinPrice, setCoinPrice] = useState("");
  const [myBalance, setMyBalance] = useState("");

  const onClickAcocunt = async () => {
    try {
      const connectAccount = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(connectAccount[0]);
      console.log(window.ethereum);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBalance = async () => {
    try {
      const getBalance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });

      const wei = parseInt(getBalance, 16);
      const gwei = wei / Math.pow(10, 9);
      const eth = wei / Math.pow(10, 18);

      setMyBalance(eth.toFixed(4));
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
    <header className="flex justify-between items-center max-w-screen-xl mx-auto p-4 font-bold">
      <Link to="/">
        <button className="flex items-center hover:scale-105">
          <img
            className="w-7 h-7 mr-1"
            src={`${process.env.PUBLIC_URL}/images/marshmellohead.png`}
            alt="logo"
          />
          <div className="text-xl">MARSHMELLO</div>
        </button>
      </Link>
      <div className="flex items-center">
        {/* {coinPrice &&
          coinPrice.map((v, i) => {
            return (
              <div key={i} className="text-slate-100 ml-2">
                {v.symbol}: {v.price.toLocaleString()}￦
              </div>
            );
          })} */}

        {account ? (
          <button
            className="hover:opacity-70"
            onClick={onClickBalance}
            title={account}
          >
            <div className="bg-slate-800 rounded-full p-2 flex items-center pointer-events-none ml-4 text-emerald-200">
              {myBalance ? (
                <>
                  <div className="bg-emerald-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <FaEthereum size={20} color="black" />
                  </div>
                  <div className="ml-2">{myBalance} tMATIC</div>
                </>
              ) : (
                <>
                  <div className="bg-emerald-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <IoWalletOutline size={20} color="black" />
                  </div>
                  <div className="ml-2">
                    {account.substring(0, 5)}...
                    {account.substring(account.length - 4)}
                  </div>
                </>
              )}
            </div>
          </button>
        ) : (
          <button
            className="bg-slate-800 rounded-full p-2 flex items-center hover:bg-opacity-80 ml-4"
            onClick={onClickAcocunt}
          >
            <div className="bg-emerald-200 w-6 h-6 rounded-full flex justify-center items-center">
              <BiWallet size={20} color="navy" />
            </div>
            <div className="ml-1 text-emerald-200">Connect</div>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
