import { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import { styled } from "styled-components";
import "react-chatbot-kit/build/main.css";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { BASE_URL } from "../utils/contants";
import axios from "axios";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const [feedbackOptions, setFeedbackOptions] = useState({
    company: "",
    question: "How was your experience with",
    answer: "",
  });

  const [feedbackModal, setFeedbackModal] = useState(false);
  const handleCloseFeedbackModal = () => {
    setFeedbackModal(false);
    setFeedbackModalStage(0);
    setFeedbackOptions({
      company: "",
      question: "How was your experience with",
      answer: "",
    });
  };
  const handleOpenFeedbackModal = () => setFeedbackModal(true);
  const [feedbackModalStage, setFeedbackModalStage] = useState(0);

  const { state } = useLocation();

  const [companies, setCompanies] = useState([
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Facebook",
    "Twitter",
    "Bosch",
    "Infosys",
    "TCS",
  ]);

  const handleClose = () => {
    setIsOpen(false);
    setBotOpened(false);
    navigate("/");
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackOptions.answer) {
      return alert("Please enter feedback");
    }
    const config: any = {
      url: `${BASE_URL}/store_feedback`,
      data: {
        company: feedbackOptions.company,
        question: feedbackOptions.question,
        answer: feedbackOptions.answer,
        email: sessionStorage.getItem("email"),
      },
      method: "POST",
    };

    try {
      const response = await axios.request(config);
      alert("Feedback Submitted Successfully");
      setFeedbackModal(false);
      setFeedbackModalStage(0);
      setFeedbackOptions({
        company: "",
        question: "How was your experience with",
        answer: "",
      });
    } catch (error: any) {
      console.log(error);
      alert("Failed to submit feedback");
    }
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
      <Modal
        onCancel={handleCloseFeedbackModal}
        onOk={handleCloseFeedbackModal}
        open={feedbackModal}
        footer={null}
        title={null}
      >
        {feedbackModalStage == 0 ? (
          <div className="pt-5">
            <h4 className="pb-3">Select Company</h4>
            <div className="grid grid-cols-2 gap-4 ">
              {companies.map((company, index) => (
                <div
                  className="shadow p-2 rounded-lg border cursor-pointer"
                  onClick={() => {
                    setFeedbackOptions({
                      ...feedbackOptions,
                      company: company,
                    });
                    setFeedbackModalStage(1);
                  }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        ) : feedbackModalStage == 1 ? (
          <div className="pt-5">
            <h4 className="pb-3">
              {feedbackOptions.question} {feedbackOptions.company}?
            </h4>
            <textarea
              rows={5}
              className=" p-2 rounded-md border w-full"
              placeholder="Write Your Feedback"
              value={feedbackOptions.answer}
              onChange={(e) => {
                setFeedbackOptions({
                  ...feedbackOptions,
                  answer: e.target.value,
                });
              }}
            />

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSubmitFeedback}
                className="p-2 px-3 bg-blue-800 rounded-md text-white"
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
      <div className={`fixed h-screen bg-black/80 w-full top-0 z-10 `}></div>

      <div
        className={`${
          isOpen ? "top-[12%] lg:top-[7%]" : "-top-[100%]"
        } z-40 fixed duration-300 transition-all shadow-lg ease-in-out`}
      >
        <StyledChat>
          <div className="intr flex justify-center items-start relative">
            <ChatBot isOpened={botOpened} />
            <div
              onClick={handleClose}
              className="text-2xl bg-white p-1 rounded-full block h-full ml-2 -mt-6"
            >
              <RxCross2 />
            </div>
            {state?.isGuest ? null : (
              <div
                onClick={handleOpenFeedbackModal}
                className="text-2xl bg-white p-2 rounded-md block absolute bottom-0 right-[calc(-200px)] cursor-pointer"
              >
                Give Feedback
              </div>
            )}
          </div>
        </StyledChat>
      </div>
    </div>
  );
};
