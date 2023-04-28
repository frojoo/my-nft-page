import React, { useState } from "react";
import { CONTRACT_ADDRESS } from "../web3.config";
import { TbClover } from "react-icons/tb";
import Music from "./music";

const ranNum = Math.floor(Math.random() * 50) + 1;
const ranImg = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;
const text = ` Marshmello is an American electronic music producer and DJ. His songs "Silence", "Wolves", "Friends", "Happier", and "Alone" have been certified multi-platinum in several countries and appeared in the Top 30 of the Billboard Hot 100.
 Marshmello wears a custom white helmet, resembling a marshmallow, for public appearances and in his music videos. His identity was initially a secret.
 These NFTs were made with reference to his custom helmet. Please note that these are not the official NFTs.\n`;
const luckyText =
  "🍀Try Your Luck!\n 목록에 없는 NFT를 직접 민팅해보세요. 구매하는 것보다 좋은 결과가 나올 수 있습니다.\n 0.8 tMATIC으로 행운의 주인공이 되세요.";

function Intro({ totalNft, mintedNft, myNft, onClickBuy, luckyNft }) {
  const [showMore, setShowMore] = useState(false);
  const [hover, setHover] = useState(false);
  const [toggle, setToggle] = useState(false);

  const onClickToggle = () => {
    setToggle(!toggle);
  };

  const onMouseOver = () => {
    setHover(true);
  };

  const onMouseOut = () => {
    setHover(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-gradient-to-b from-white to-black py-14 text-slate-100">
      <div className="relative max-w-screen-xl mx-auto p-4 flex justify-between">
        <div>
          <img
            className="absolute z-10 top-0 left-0 py-10 translate-x-1/2 w-1/2 h-full"
            src={`${process.env.PUBLIC_URL}/images/marshmello intro.png`}
            alt="intro"
          />
          <div className="realtive max-w-screen-xl mx-auto">
            <button
              className="absolute hover:opacity-80"
              onClick={onClickToggle}
              title="Play Music"
            >
              <img className="w-40 h-40 rounded-xl" src={ranImg} alt="random" />
            </button>
            <div className="w-40 h-40 rounded-xl flex justify-center items-center bg-white">
              Loading...
            </div>
            {toggle && (
              <div className="absolute top-1 z-10 left-72">
                <Music />
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="text-4xl font-bold">Marshmello</div>
            <div className="bg-white w-6 h-6 rounded-md flex justify-center items-center">
              <img
                className="w-5 h-5"
                src={`${process.env.PUBLIC_URL}/images/marshmello.png`}
                alt="icons"
              />
            </div>
          </div>

          <div className="relative z-20 flex itmes-center mt-4">
            by
            <div className="text-emerald-200 ml-2">{CONTRACT_ADDRESS}</div>
          </div>
          <div className="relative z-20 mt-2 max-w-screen-md text-gray-300">
            {showMore ? (
              <>
                <div className="whitespace-pre-wrap">{text}</div>
                <button
                  className=" absolute bottom-0 right-0 text-slate-100 font-semibold pr-6"
                  onClick={toggleShowMore}
                >
                  ∧ 닫기
                </button>
              </>
            ) : (
              <>
                <div className="whitespace-pre-wrap">
                  {text.substring(0, 181)}...
                </div>
                <button
                  className="absolute bottom-0 right-0 text-slate-100 font-semibold pr-6"
                  onClick={toggleShowMore}
                >
                  ∨ 더보기
                </button>
              </>
            )}
          </div>
          <div className="flex text-center gap-3 mt-4 text-slate-100">
            <div>
              <div className="font-bold text-xl">{totalNft}</div>
              <div className="text-gray-300">Total NFT</div>
            </div>
            <div>
              <div className="font-bold text-xl">{mintedNft}</div>
              <div className="text-gray-300">Minted NFT</div>
            </div>
            <div>
              <div className="font-bold text-xl">{myNft}</div>
              <div className="text-gray-300">My NFT</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <div className="mr-12 mb-4 flex flex-col justify-center items-center">
            {luckyNft && (
              <img
                className="w-32 h-32 rounded-xl shadow-md"
                src={luckyNft.image}
                alt={luckyNft.name}
              />
            )}
          </div>
          {hover ? (
            <div className="bg-slate-700 text-emerald-200 p-4 rounded-2xl w-64 mb-3">
              <div className="whitespace-pre-wrap">{luckyText}</div>
            </div>
          ) : (
            ""
          )}

          <div className="bg-emerald-200 text-slate-800 px-2 py-1 font-bold rounded-md mr-10">
            <button
              className="flex items-center text-xl text-end"
              onClick={onClickBuy}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              <TbClover size={20} color="green" />
              <div className="ml-1">Lucky Mint</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
