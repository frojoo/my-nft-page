import React, { useEffect, useState } from "react";
import Intro from "../components/intro";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Nfts from "../components/nfts";
import axios from "axios";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const gasPrice = "0x5208";
const amountHex = (0.3 * Math.pow(10, 18)).toString(16);

function Main({ account }) {
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [luckyNft, setLuckyNft] = useState();

  //럭키 민팅
  const onClickBuy = async () => {
    try {
      if (!account) {
        alert("지갑을 연결해주세요");
        return;
      }

      //코인 전송
      const sendTransaction = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: "0x85645E1B3041b4B5c5D3571c60320c0bCb8d7a5C",
            value: amountHex,
            gas: gasPrice,
          },
        ],
      });
      if (!sendTransaction) return;

      //전송 후 민팅
      const response = await contract.methods.mintNft().send({
        from: account,
      });

      if (!response) return;

      //민팅된 이미지 불러오기
      const balanceOf = await contract.methods.balanceOf(account).call();
      const tokenOfOwnerByIndex = await contract.methods
        .tokenOfOwnerByIndex(account, parseInt(balanceOf) - 1)
        .call();
      const tokenUri = await contract.methods
        .tokenURI(tokenOfOwnerByIndex)
        .call();
      const result = await axios.get(tokenUri);

      setLuckyNft(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  //총량
  const getTotal = async () => {
    try {
      if (!contract) return;

      const response = await contract.methods.totalNft().call();

      setTotalNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  //발행량
  const getMinted = async () => {
    try {
      if (!contract) return;

      const response = await contract.methods.totalSupply().call();

      setMintedNft(response);
      setPageNum(parseInt((parseInt(response) - 1) / 12) + 1);
    } catch (error) {
      console.error(error);
    }
  };

  //소유 개수
  const getMine = async () => {
    try {
      if (!contract || !account) return;

      const response = await contract.methods.balanceOf(account).call();
      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotal();
    getMinted();
  }, []);

  useEffect(() => {
    getMine();
  }, [account]);

  return (
    <div>
      <Intro
        totalNft={totalNft}
        mintedNft={mintedNft}
        myNft={myNft}
        onClickBuy={onClickBuy}
        luckyNft={luckyNft}
      />
      <Nfts pageNum={pageNum} mintedNft={mintedNft} />
    </div>
  );
}

export default Main;
