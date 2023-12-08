import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Synopsis from "./components/Synopsis";
import Info from "./components/Info";
import Pictures from "./components/Pictures";
import Characters from "./components/Characters";
import Statistics from "./components/Statistics";
import External from "./components/External";
import MoreInfoComp from "./components/MoreInfoComp";
import News from "./components/News";
import Recommendations from "./components/Recommendations";
import Relations from "./components/Relations";
import Reviews from "./components/Reviews";

const TabButton = ({ name, activeTab, onClick, children }) => (
  <button
    name={name}
    onClick={onClick}
    className={`${
      activeTab === name ? "bg-blue-500 text-white" : ""
    } rounded-md px-3 py-1`}
  >
    {children}
  </button>
);

function ContentPage() {
  const { type, contentId } = useParams();

  const [content, setContent] = useState(null);

  const [activeTab, setActiveTab] = useState("details");

  const tabData = [
    {
      name: "details",
      label: "Details",
      component: [
        <Synopsis synopsis={content?.synopsis} />,
        <Relations type={type} contentId={contentId} />,
      ],
    },
    {
      name: "characters",
      label: "Characters",
      component: <Characters contentId={contentId} type={type} />,
    },
    {
      name: "recommendations",
      label: "Recommendations",
      component: <Recommendations contentId={contentId} type={type} />,
    },
    {
      name: "pictures",
      label: "Pictures",
      component: <Pictures contentId={contentId} type={type} />,
    },
    {
      name: "stats",
      label: "Stats",
      component: <Statistics contentId={contentId} type={type} />,
    },
    {
      name: "reviews",
      label: "Reviews",
      component: <Reviews contentId={contentId} type={type} />,
    },
    {
      name: "news",
      label: "News",
      component: <News contentId={contentId} type={type} />,
    },
    {
      name: "external",
      label: "Links",
      component: <External contentId={contentId} type={type} />,
    },
    {
      name: "more_info",
      label: "More Info",
      component: <MoreInfoComp contentId={contentId} type={type} />,
    },
  ];

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/full`
    ).then((res) => res.json());

    console.log(temp.data);
    setContent(temp.data);
  };

  // Get Content
  useEffect(() => {
    FetchContent(type, contentId);
  }, [contentId, type]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-center">
      {/* Left */}
      <div className="md:w-64 py-4 px-2 flex flex-col gap-3 bg-blue-100">
        <img
          className="block w-full object-cover rounded-2xl md:h-[375px]"
          src={content?.images.jpg.large_image_url}
          alt={content?.title}
        />

        <Info content={content} type={type} />
      </div>

      {/* Right */}
      <div className="w-full md:w-[810px] py-4 px-2 bg-blue-50 flex flex-col gap-2">
        {/* Title */}
        <div className="flex items-center gap-2 border-b-2 border-gray-900">
          <h1 className="text-xl font-bold ">{content?.title}</h1>
          <p> - </p>
          <p className="text-lg">{content?.title_english}</p>
        </div>

        {/* stats */}
        <div className="bg-blue-500 py-3 px-1 border-2 border-gray-900 flex flex-col md:flex-row justify-around">
          {/* Score */}
          <div className="px-3 font-bold flex flex-col justify-center items-center w-fit ">
            <div className="flex gap-2  ">
              <p className="text-gray-50 text-xl ">Score:</p>
              <p className="text-gray-50 text-lg">{content?.score}</p>
            </div>
            <p className="text-sm font-normal text-gray-50">
              {content?.scored_by.toLocaleString("en-US")} users
            </p>
          </div>

          <div className="border-r-2 border-gray-100" />

          {/* Rank */}
          <div className="px-3 font-bold flex  gap-2 justify-center items-center w-fit ">
            <p className="text-gray-50 text-xl ">Rank #</p>
            <p className="text-gray-50 text-lg">{content?.rank}</p>
          </div>

          <div className="border-r-2 border-gray-100" />

          {/* Popularity */}
          <div className="px-3 font-bold flex  gap-2 justify-center items-center w-fit ">
            <p className="text-gray-50 text-xl ">Popularity #</p>
            <p className="text-gray-50 text-lg">{content?.popularity}</p>
          </div>

          <div className="border-r-2 border-gray-100" />

          {/* Popularity */}
          <div className="px-3 font-bold flex  gap-2 justify-center items-center w-fit ">
            <p className="text-gray-50 text-xl ">Members: </p>
            <p className="text-gray-50 text-lg">
              {content?.members.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap">
          {tabData.map((tab) => (
            <TabButton
              key={tab.name}
              name={tab.name}
              activeTab={activeTab}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>

        {content && (
          <div>
            {tabData.map((tab, i) => (
              <React.Fragment key={tab.name}>
                {activeTab === tab.name && tab.component}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentPage;
