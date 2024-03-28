import { useState } from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import ChatBot from "./ChatBot";
import { styled } from "styled-components";
import "react-chatbot-kit/build/main.css";
import { RxCross2 } from "react-icons/rx";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const [tab, setTab] = useState("");
  const handleOpen = () => {
    setIsOpen(true);
    setBotOpened(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setBotOpened(false);
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
  const Data = [
    {
      icon: <HiOutlineAcademicCap />,
      title: "Academics",
      tab: "academic",
    },
    {
      icon: <HiOutlineAcademicCap />,
      title: "Placement",
      tab: "placement",
    },
    {
      icon: <HiOutlineAcademicCap />,
      title: "Admission",
      tab: "admission",
    },
  ];
  return (
    <div className="flex justify-center items-center my-6 lg:my-0 h-[100vh] w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 h-[fit] w-[80%] mx-auto">
        {Data.map((card, idx) => {
          return (
            <div
              key={idx}
              className="border rounded-lg h-full hover:bg-gray-500/10 shadow-lg duration-150"
            >
              <div className="py-9 px-6 lg:px-12 lg:py-16">
                <div className="flex flex-col w-full justify-center items-center gap-y-3 lg:gap-y-7">
                  <div className="text-5xl bg-slate-400 rounded-full p-3">
                    {card.icon}
                  </div>
                  <div className="">
                    <h3 className="text-2xl">{card.title}</h3>
                  </div>
                  <button
                    className="px-16 py-2 text-white rounded-xl bg-gray-600 hover:bg-gray-600/60"
                    onClick={() => {
                      setTab(card.tab);
                      handleOpen();
                    }}
                  >
                    open
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`fixed h-screen bg-black/80 w-full  z-10 ${
          isOpen ? "top-[0%]" : "-top-[100%]"
        }`}
      ></div>

      <div
        className={`${
          isOpen ? "top-[12%] lg:top-[7%]" : "-top-[100%]"
        } z-40 fixed duration-300 transition-all shadow-lg ease-in-out`}
      >
        <StyledChat>
          <div className="intr flex justify-center items-start">
            <ChatBot isOpened={botOpened} tab={tab} />
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
