import React from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const Feedbacks = (props: Props) => {
  const { state } = useLocation();
  const feedbacks = state.feedbacks;
  const selectedCompany = state.selectedCompany;
  return (
    <div className="px-5 py-5">
      <div className="pt-5">
        <h4 className="pb-5">Feedbacks of Company: {selectedCompany}</h4>
        {feedbacks?.length > 0 && (
          <p className="pb-2 text-base">
            How was your experience with {selectedCompany}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 ">
          {feedbacks?.filter((s: any) => s?.company == selectedCompany)
            ?.length > 0 ? (
            feedbacks
              ?.filter((s: any) => s?.company == selectedCompany)
              ?.map((feedback: any, index: number) => (
                <div
                  className="shadow p-2 rounded-lg cursor-pointer flex flex-col gap-1 border bg-white"
                  key={index}
                >
                  <span
                    className={`p-2 rounded-md cursor-pointer text-center ${
                      feedback.difficulty == "Hard"
                        ? "bg-red-200 text-black"
                        : feedback.difficulty == "Medium"
                        ? "bg-yellow-200 text-black"
                        : "bg-green-200 text-black"
                    }`}
                  >
                    {feedback.difficulty || "Easy"}
                  </span>
                  <div className="mt-2">
                    <b>{feedback.username}</b> - {feedback.answer}
                  </div>
                  <div></div>
                </div>
              ))
          ) : (
            <p className="font-bold">No feedbacks found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
