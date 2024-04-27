import PlayButton from "@/components/Button/PlayButton";
import Modal from "@/components/Modal";
import Image from "next/image";
import React from "react";

import {
  StyleStartScreenWrapper,
  StyledBlockCorner,
  StyledStartScreen,
} from "./StartScreen.styles";
import wallets from "@/config/wallet";
import CloseButton from "@/components/Button/CloseButton";
import { useConnect } from "@starknet-react/core";
import { useDispatch } from "react-redux";
import { setChainId, setSound } from "@/redux/user/user-slice";
import { useAuth } from "@/hooks/useAuth";

const StartScreen = () => {
  const [isOpenConnectWallet, setIsOpenConnectWallet] = React.useState(false);
  const { connect, connectors } = useConnect();
  const { sound } = useAuth();
  const dispatch = useDispatch();
  const connectWallet = async (connectorIndex: number) => {
    await connect({ connector: connectors[connectorIndex] });
    await dispatch(setChainId(connectorIndex));
    setIsOpenConnectWallet(() => {
      return false;
    });
  };
  return (
    <StyledStartScreen>
      <StyleStartScreenWrapper>
        <button
          className="icon_btn"
          style={{
            position: "absolute",
            top: 0,
            right: "10px",
          }}
          onClick={async () => {
            await dispatch(setSound(!sound));
          }}
        >
          <Image
            src={
              sound
                ? "/assets/icons/sound_off.svg"
                : "/assets/icons/sound_on.svg"
            }
            alt=""
            height={24}
            width={24}
          />
        </button>
        <Image
          src="/assets/arts/teris_game.svg"
          alt=""
          height={101}
          width={179}
        />
        <PlayButton
          onClick={() => {
            setIsOpenConnectWallet(true);
          }}
        />
        <Modal
          isOpen={isOpenConnectWallet}
          onClose={() => {
            setIsOpenConnectWallet(false);
          }}
        >
          <div className="modal-connect-wallet">
            <p>Connect Wallet</p>
            <CloseButton
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
              }}
              onClose={() => {
                setIsOpenConnectWallet(false);
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {wallets.map((wallet) => (
                <button
                  key={wallet.label}
                  onClick={async () => {
                    await connectWallet(wallet.index);
                  }}
                  className="btn-connect-wallet"
                >
                  <Image
                    src={wallet.icon}
                    alt={wallet.label}
                    height={24}
                    width={24}
                  />
                  <span>{wallet.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Modal>
        <StyledBlockCorner top={0} left={0} rotate={0} />
        <StyledBlockCorner bottom={0} left={0} rotate={-90} />
        <StyledBlockCorner right={0} top={0} rotate={90} />
        <StyledBlockCorner bottom={0} right={0} rotate={180} />
      </StyleStartScreenWrapper>
    </StyledStartScreen>
  );
};

export default StartScreen;