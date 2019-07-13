import React, { useEffect, useContext, useState } from "react";
import DrizzleContext from "../state/Context";
import ThreeScape from "./ThreeScape";
import Hyphae from "../contracts/Hyphae.json";
import Toadstool from "../contracts/Toadstool.json";
export const Home = () => {
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
  const [shroomArray, setShroomArray] = useState([]);
  const [sporeArray, setSporeArray] = useState([]);

  const hyphaeIndex = 0;
  const toadstoolIndex = 0;

  useEffect(() => {
    const initContracts = async () => {
      const hyphaeAddress = await drizzle.contracts.Mycelium.methods
        .hyphaes(hyphaeIndex)
        .call();
      drizzle.addContract({
        contractName: "Hyphae",
        web3Contract: new drizzle.web3.eth.Contract(Hyphae.abi, hyphaeAddress)
      });

      const toadAddress = await drizzle.contracts.Mycelium.methods
        .toads(toadstoolIndex)
        .call();
      drizzle.addContract({
        contractName: "Toadstool",
        web3Contract: new drizzle.web3.eth.Contract(Toadstool.abi, toadAddress)
      });
    };
    initContracts();
  }, []);

  let toadstool;
  useEffect(() => {
    if (
      !drizzle.contracts.Toadstool ||
      !drizzleState.contracts.Toadstool.synced
    )
      return;
    toadstool = drizzle.contracts.Toadstool;
    const createShroomArray = async () => {
      const shroomLength = await toadstool.methods.getShroomsLength().call();
      const sArray = [];
      for (let i = 0; i < shroomLength; i++) {
        const shroomObj = await toadstool.methods.getShroom(i).call();
        sArray.push(shroomObj);
      }
      setShroomArray(sArray);
    };
    createShroomArray();
  }, [drizzleState]);

  let hyphae;
  useEffect(() => {
    if (!drizzle.contracts.Hyphae || !drizzleState.contracts.Hyphae.synced)
      return;
    hyphae = drizzle.contracts.Hyphae;
    const getSpore = async () => {
      const sArray = [];
      for (let i = 0; i < 30; i++) {
        const spore = await hyphae.methods.getSpore(i).call();
        sArray.push(spore);
      }
      setSporeArray(sArray);
    };
    getSpore();
  }, [drizzleState]);

  return (
    <div>
      <ThreeScape shroomArray={shroomArray} sporeArray={sporeArray} />
    </div>
  );
};
