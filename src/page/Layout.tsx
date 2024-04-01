import { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import { styled } from "styled-components";
import "react-chatbot-kit/build/main.css";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setBotOpened(false);
    navigate('/')
  };
  const StyledChat = styled.div`
    .intr {
      & .react-chatbot-kit-chat-inner-container {
        border: 1px solid rgb(var(--dark-color) / 0.25);
        border-radius: 0.4rem;
        overflow: hidden;
        & .react-chatbot-kit-chat-bot-message {
          & .react-chatbot-kit-chat-bot-message-arrow {
            border-width: 0;
          }
        }
      }
    }
  `;
  useEffect(() => {
    setTimeout(() => {
        setBotOpened(true);
        setIsOpen(true);
    }, 100);
}, []);
  return (
    <div className="flex justify-center items-center my-6 lg:my-0 h-[100vh] w-full">
        <div
          className={`fixed h-screen bg-black/80 w-full top-0 z-10 `}
        ></div>

        <div
          className={`${
            isOpen ? "top-[12%] lg:top-[7%]" : "-top-[100%]"
          } z-40 fixed duration-300 transition-all shadow-lg ease-in-out`}
        >
          <StyledChat>
            <div className="intr flex justify-center items-start">
              <ChatBot isOpened={botOpened} />
              <div
                onClick={handleClose}
                className="text-2xl bg-white p-1 rounded-full block h-full ml-2 -mt-6"
              >
                <RxCross2 />
              </div>
            </div>
          </StyledChat>
        </div>
      </div>
  );
};
