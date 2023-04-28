import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

function Detail() {
  const [metadata, setMetadata] = useState();
  const [bg, setBg] = useState("");
  const [face, setFace] = useState("");
  const [line, setLine] = useState("");

  const { tokenId } = useParams();

  const getNft = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
      );

      setMetadata(response.data);
      setBg(response.data.attributes[0].value);
      setFace(response.data.attributes[1].value);
      setLine(response.data.attributes[2].value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNft();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center py-16 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-2 gap-20">
        {metadata ? (
          <>
            <div className="bg-zinc-700 rounded-2xl shadow-md">
              <img
                className="rounded-t-2xl"
                src={metadata.image}
                alt={metadata.name}
              />
              <div className="p-5">
                <div className="text-gray-300">판매가</div>
                <div className="flex items-center mt-1 text-3xl font-bold">
                  <FaEthereum size={24} color="skyblue" />
                  {bg == "white" && face == "black" && line == "none" ? (
                    <span>1.89 tMATIC</span>
                  ) : (bg === "white" && face == "black") || line == "none" ? (
                    <span>0.68 tMATIC</span>
                  ) : bg == "white" || face == "black" || line == "none" ? (
                    <span>0.24 tMATIC</span>
                  ) : (
                    <span>0.12 tMATIC</span>
                  )}
                </div>
                <button className="mt-8 shadow-md bg-teal-400 text-black w-1/2 h-10 rounded-lg text-lg">
                  Buy
                </button>
              </div>
            </div>
            <div className="pt-24 flex flex-col">
              <div className="flex items-center gap-2">
                <div className="text-xl text-gray-300">Marshmello</div>
                <div className="bg-white w-5 h-5 rounded-md flex justify-center items-center border-1 border-gray-300">
                  <img
                    className="w-4 h-4"
                    src={`${process.env.PUBLIC_URL}/images/marshmello.png`}
                    alt="icons"
                  />
                </div>
              </div>
              <div className="mt-3 text-4xl font-bold">{metadata.name}</div>
              <div className="border-2 px-4 py-6 rounded-xl border-gray-400 w-full h-full mt-16">
                <div className=" flex items-center text-lg text-gray-100">
                  <MdOutlineDescription />
                  <div className="ml-1">Details</div>
                </div>
                <div className="mt-6 mx-3 grid grid-cols-3">
                  {metadata.attributes.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className="bg-zinc-800 w-28 h-28 p-2 rounded-lg text-gray-100"
                      >
                        <div className="text-gray-300">{v.trait_type}</div>
                        <div className="text-lg font-bold pt-2">{v.value}</div>
                        {v.trait_type === "Background" &&
                        v.value === "white" ? (
                          <div className="text-gray-300 text-sm mt-1">5%</div>
                        ) : v.trait_type === "Face" && v.value === "black" ? (
                          <div className="text-gray-300 text-sm mt-1">5%</div>
                        ) : v.trait_type === "Line" && v.value !== "none" ? (
                          <div className="text-gray-300 text-sm mt-1">20%</div>
                        ) : (
                          <div className="text-gray-300 text-sm mt-1">10%</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Detail;
