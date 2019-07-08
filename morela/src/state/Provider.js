import React from "react";
import { Drizzle, generateStore } from "drizzle";
import Context from "./Context";
import Toadstool from "../contracts/Toadstool.json";

const options = {
  contracts: [Toadstool],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  }
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const Provider = ({ children }) => {
  return <Context.Provider drizzle={drizzle}>{children}</Context.Provider>;
};

export default Provider;