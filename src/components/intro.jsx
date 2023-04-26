import React, { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "../web3.config";

const ranNum = Math.floor(Math.random() * 50) + 1;
const ranImg = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;
const text = ` Marshmello is an American electronic music producer and DJ. His songs "Silence", "Wolves", "Friends", "Happier", and "Alone" have been certified multi-platinum in several countries and appeared in the Top 30 of the Billboard Hot 100.
 Marshmello wears a custom white helmet, resembling a marshmallow, for public appearances and in his music videos. His identity was initially a secret.
 These NFTs were made with reference to his custom helmet. Please note that these are not the official NFTs.\n`;

function Intro({ totalNft, mintedNft, myNft }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-gradient-to-b from-white to-black py-14 text-slate-100">
      <div className="relative max-w-screen-xl mx-auto p-4">
        <img
          className="absolute z-10 top-0 left-0 py-10 translate-x-1/2 w-1/2 h-full"
          src={`${process.env.PUBLIC_URL}/images/marshmello intro.png`}
          alt="intro"
        />
        <div className="realtive max-w-screen-xl mx-auto">
          <img
            className="absolute w-40 h-40 rounded-xl"
            src={ranImg}
            alt="random"
          />
          <div className="w-40 h-40 rounded-xl flex justify-center items-center bg-white">
            Loading...
          </div>
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
                ∧ Close
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
                ∨ Read More
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
    </div>
  );
}

export default Intro;
