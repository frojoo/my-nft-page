import React, { useEffect, useState } from "react";
import NftCard from "./nftCard";
import axios from "axios";

function Nfts({ pageNum, mintedNft }) {
  const [focusedPage, setFocusedPage] = useState(1);
  const [nfts, setNfts] = useState();

  const getNfts = async (p) => {
    try {
      let nftArray = [];

      setNfts();

      for (let i = 0; i < 12; i++) {
        const tokenId = i + 1 + (p - 1) * 12;

        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
        );

        nftArray.push({ tokenId, metadata: response.data });
      }

      setNfts(nftArray);
      console.log(nftArray);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPage = (p) => () => {
    setFocusedPage(p);
    getNfts(p);
  };

  const pages = () => {
    let pagesArray = [];

    for (let i = 0; i < pageNum; i++) {
      pagesArray.push(
        <button
          key={i}
          className={`ml-2 font-bold text-2xl ${
            focusedPage === i + 1 ? "text-white" : "text-gray-400"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1}
          <span className="text-base">Page</span>
        </button>
      );
    }

    return pagesArray;
  };

  useEffect(() => {
    getNfts(1);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto pt-4">
      <div>{pages()}</div>
      <ul className="mt-8 p-6 grid grid-cols-2 xl:grid-cols-3 justify-items-center gap-10">
        {nfts ? (
          nfts.map((v, i) => {
            return (
              <NftCard
                key={i}
                tokenId={v.tokenId}
                metadata={v.metadata}
                mintedNft={mintedNft}
              />
            );
          })
        ) : (
          <div className="justify-items-center">Loading...</div>
        )}
      </ul>
    </div>
  );
}

export default Nfts;
