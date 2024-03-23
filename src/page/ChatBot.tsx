import { useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import config from "../../bot/config";
import ActionProvider from "../../bot/ActionProvider";
import MessageParser from "../../bot/MessageParser";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { decrementCount } from "../../redux/features/messages-slice";
import { useNavigate } from 'react-router-dom';
import "../ChatBot.css"; 


interface Props {
    isOpened:boolean
    tab:string
}

const ChatBot = ({isOpened, tab}: Props) => {
  const navigate = useNavigate()

    const count = useAppSelector((state) => state.messageReducer.count);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      const interval = setInterval(() => {
        if (count > 0) {
          dispatch(decrementCount());
        } else if (count === 0) {
          navigate("/success");
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, [count, dispatch, navigate]);
    let dynamicConfig = { ...config };
  if (tab === "academic") {
    dynamicConfig = { ...dynamicConfig, botName: "Siddaganga Academic BOT" };
  } else if (tab === "placement") {
    dynamicConfig = { ...dynamicConfig, botName: "Siddaganga Placement Bot" };
  } else if (tab === "admission") {
    dynamicConfig = { ...dynamicConfig, botName: "Siddaganga Admission Bot" };
  }
    return (
        <div className='chatbot-container '>
            {isOpened && (
        <Chatbot
          config={dynamicConfig}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
        </div>
    )
}

export default ChatBot
