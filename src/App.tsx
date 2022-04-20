import "./App.css";
import {useMemo,Suspense } from "react";
import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

//Testing 

import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "@react-three/drei";

const Model = () =>{
  const gltf = useLoader(GLTFLoader, 'Latest.glb')
  return (
    <>
       <primitive  position={[0, 0, 0]} object={gltf.scene} scale={1} />
    </>
  )
}

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;

const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              MINT!
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              FAQ
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com/TreehouseNFT" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://t.co/RS56JPQAz3" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <div className="social-icons hide-800">
            <a href="https://twitter.com/TreehouseNFT" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://t.co/RS56JPQAz3" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <div className="cardEx"  style={{ marginBottom: '30px' }}>
            <div id="canvas_container">
              <Canvas camera={{ position: [4, 6, 8] }} style={{height : '400px'}}>
                <spotLight intensity={0.5} />
                <ambientLight intensity={0.8} position={[5, 20, 20]}/>
                <Suspense  fallback={null}>
                  <Model />
                </Suspense> 
                <OrbitControls />
              </Canvas>
            </div>
        </div>
        
     
        <header className="cardEx" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">Welcome To</h3>
            <h1 className="pb-3">The TreeHouse Club</h1>
            <p className="text-secondary-color">
             Art plus utility comes together<p></p>
             For a treehouse to help keep you dry in the weather.<p></p>
             3-D gallery and customizations galore<p></p>
             For the metaverse at the core.<p></p>
             Now if only we could find a way in<p></p>
             So we can plant these trees together and all win.
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>

        <div id="link2" className="cardEx">
          <h1 style={{ padding: "0 0 24px 0"}}>Frequently Asked Questions</h1>
          <div>
            <h4>🌳 What is Tree House Club?</h4>
            <p>
              Long-term vision project with over 6 members of the team!
            </p>

            <hr />
          </div>

          <div>
            <h4>🌳 Blockchain?</h4>
            <p>
              Solana.
            </p>

            <hr />
          </div>

          <div>
            <h4>🌳 How many can I mint?</h4>
            <p>
              Whitelist token holders get early access to Mint 1 per wallet for 1.5 SOL. Public supply will start 2 hours after early access for 2 SOL.
            </p>

            <hr />
          </div>

          <div>
            <h4>🌳 Mint Date?</h4>
            <p>
              <table className="table">
                <tbody>
                  <tr>
                    <td>New York, NY, USA </td>
                    <td>Saturday, 5  </td>
                    <td> 17:00</td>
                  </tr>
                  <tr>
                    <td>London, United Kingdom </td>
                    <td>Saturday, 5  </td>
                    <td> 22:00</td>
                  </tr>
                  <tr>
                    <td>Moscow, Russia </td>
                    <td>Sunday, 6  </td>
                    <td> 01:00</td>
                  </tr>
                  <tr>
                    <td>New Delhi, India </td>
                    <td>Sunday, 6  </td>
                    <td> 03:30</td>
                  </tr>
                  <tr>
                    <td>Beijing, China </td>
                    <td>Sunday, 6  </td>
                    <td> 06:00</td>
                  </tr>
                  <tr>
                    <td>Australian Eastern Time </td>
                    <td>Sunday, 6  </td>
                    <td> 09:00</td>
                  </tr>
                  <tr>
                    <td>UTC </td>
                    <td>Saturday, 5  </td>
                    <td> 22:00</td>
                  </tr>
                </tbody>
              </table>
            </p>

            <hr />
          </div>

          <div>
            <h4>🌳 Where can we see rarity ?</h4>
            <p>
            <a href="https://moonrank.app/" target="_blank" rel="noreferrer">Moonrank</a>
            </p>

            <hr />
          </div>

          <div>
            <h4>🌳 Why should you mint one?</h4>
            <p>
              <a href="https://twitter.com/TreehouseNFT/status/1495638054236827648" target="_blank" rel="noreferrer">Read Here</a>
            </p>

            <hr />
          </div>

          <div>
            <h4>Where will this be listed?</h4>
            <p>
            <a href="https://magiceden.io/" target="_blank" rel="noreferrer">Magic Eden</a> right after mint!
            </p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
