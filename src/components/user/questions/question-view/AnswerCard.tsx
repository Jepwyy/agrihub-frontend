import React, { useState } from "react";
import { timeAgo } from "../../../lib/utils";
import { QuestionViewSchema } from "../../../../api/openapi";
import { TbMessages } from "react-icons/tb";
import { GoReport } from "react-icons/go";
import { TbMessageCirclePlus } from "react-icons/tb";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { UserAuth } from "../../../../providers/AuthProvider";
import { Input } from "../../../ui/input";
interface AnswerCardProps {
  data: QuestionViewSchema | undefined;
}
const AnswerCard = ({ data }: AnswerCardProps) => {
  const [reply, setReply] = useState(false);
  const { data: currentUser } = UserAuth() ?? {};

  const onClickReply = () => {
    if (reply) {
      setReply(false);
    } else {
      setReply(true);
    }
  };
  return (
    <div>
      <div className="col-span-3 flex gap-2 items-center flex-nowrap">
        <img
          src={data?.user.avatar}
          className="w-11 h-11 object-center object-cover bg-slate-500 rounded-xl"
        />
        <div>
          <h6 className=" font-semibold ">{data?.user?.username}</h6>
          <p className="text-gray-400 text-sm">
            {timeAgo(data?.createdat || "")}
          </p>
        </div>
      </div>
      <div className="border-l-2 ml-5 pl-8 mt-2">
        <div className="">
          <div
            className="leading-loose"
            dangerouslySetInnerHTML={{
              __html: data?.question || "<p></p>"
            }}
          />
        </div>
        <div className="flex gap-8 mt-3 mb-5">
          <div
            className="flex items-center gap-3 hover:underline"
            role="button"
          >
            <span className="">
              <IoIosArrowUp size={20} />
            </span>
            <span className=" ">2</span>
            <span className="">
              <IoIosArrowDown size={20} />
            </span>
          </div>
          <div
            className="flex items-center gap-2 hover:underline select-none"
            role="button"
            onClick={onClickReply}
          >
            <span className="">
              <TbMessageCirclePlus size={20} />
            </span>
            <span className="">Reply</span>
          </div>
          <div
            className="flex items-center gap-2 hover:underline select-none"
            role="button"
          >
            <span className="">
              <GoReport size={20} />
            </span>
            <span className=" ">Report</span>
          </div>
          <div
            className="flex items-center gap-2 hover:underline select-none"
            role="button"
          >
            <span className="">
              <TbMessages size={20} />
            </span>
            <span className=" ">View 2 comments</span>
          </div>
        </div>
        {currentUser && reply && (
          <>
            <p className="ms-[3.5rem] text-gray-500 font-medium text-sm mb-1">
              Reply as {currentUser?.username}
            </p>
            <div className="flex items-center gap-2 pb-4">
              <img
                src={currentUser?.avatar}
                className="h-11 w-11 rounded-full border "
              />
              <div className="w-full">
                <Input placeholder="Type your reply here..." />
              </div>
              <button className="bg-primary text-white py-2 px-6 rounded-3xl text-sm ">
                <span>Send</span>
              </button>
            </div>
            <hr className="mb-2" />
          </>
        )}
        <hr />
        <div className="ml-10 my-4">
          <div className="col-span-3 flex gap-2 items-center flex-nowrap">
            <img
              src={data?.user.avatar}
              className="w-11 h-11 object-center object-cover bg-slate-500 rounded-xl"
            />
            <div>
              <h6 className=" font-semibold ">{data?.user?.username}</h6>
              <p className="text-gray-400 text-sm">
                {timeAgo(data?.createdat || "")}
              </p>
            </div>
          </div>
          <div className="border-l-2 ml-5 pl-8 mt-2">
            <div className="">
              <div
                className="leading-loose"
                dangerouslySetInnerHTML={{
                  __html: data?.question || "<p></p>"
                }}
              />
            </div>
            <div className="flex gap-8 mt-3 mb-5">
              <div
                className="flex items-center gap-3 hover:underline"
                role="button"
              >
                <span className="">
                  <IoIosArrowUp size={20} />
                </span>
                <span className=" ">2</span>
                <span className="">
                  <IoIosArrowDown size={20} />
                </span>
              </div>
              <div
                className="flex items-center gap-2 hover:underline"
                role="button"
              >
                <span className="">
                  <TbMessageCirclePlus size={20} />
                </span>
                <span className=" ">Reply</span>
              </div>
              <div
                className="flex items-center gap-2 hover:underline"
                role="button"
              >
                <span className="">
                  <GoReport size={20} />
                </span>
                <span className=" ">Report</span>
              </div>
            </div>
          </div>
          <hr className="ml-12 pl-8 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
