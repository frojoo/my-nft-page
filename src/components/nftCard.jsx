import React from "react";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";

function NftCard({ tokenId, metadata, mintedNft }) {
  const bg = metadata.attributes[0].value;
  const face = metadata.attributes[1].value;
  const line = metadata.attributes[2].value;
  return (
    <Link to={`${tokenId}`}>
      <div className="relative rounded-2xl bg-gray-800 cursor-pointer">
        {parseInt(mintedNft) < tokenId && (
          <div className="absolute bg-gray-800 rounded-2xl flex justify-center items-center w-full h-full text-3xl font-bold">
            Not minted
          </div>
        )}
        <img
          className="rounded-t-2xl"
          src={metadata.image}
          alt={metadata.name}
        />
        <div className="mt-3 flex items-center gap-2">
          <div className="text-gray-300 text-lg ml-3">Marshmello</div>
          <div className="bg-white w-4 h-4 rounded-md flex justify-center items-center">
            <img
              className="w-3 h-3"
              src={`${process.env.PUBLIC_URL}/images/marshmello.png`}
              alt="icons"
            />
          </div>
        </div>
        <div className="font-bold text-xl ml-3">{metadata.name}</div>
        <div className="ml-3  mt-6">
          <div className="text-sm text-gray-300">판매가</div>
          {parseInt(mintedNft) < tokenId ? (
            <div className="font-bold pb-4">-</div>
          ) : (
            <div className="flex font-bold pb-4 mt-1 items-center">
              <FaEthereum size={18} color="skyblue" />
              {bg == "white" && face == "black" && line == "none" ? (
                <span>3.89 tMATIC</span>
              ) : (bg === "white" && face == "black") || line == "none" ? (
                <span>2.67 tMATIC</span>
              ) : bg == "white" || face == "black" || line == "none" ? (
                <span>1.09 tMATIC</span>
              ) : (
                <span>0.09 tMATIC</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default NftCard;
