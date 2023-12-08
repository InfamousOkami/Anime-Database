import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const getWidth = (percentage) => {
  return percentage * 10;
};

function Statistics({ contentId, type }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  const FetchContent = async (type, contentId) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${type}/${contentId}/statistics`
    ).then((res) => res.json());

    setStats(temp.data);
    console.log(temp.data);

    setLoading(false);
  };

  // Get Content
  useEffect(() => {
    FetchContent(type, contentId);
  }, [contentId, type]);

  if (loading === true) {
    return (
      <div>
        <p>
          <BarLoader />
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-10 bg-white p-3 rounded-lg">
        {/* Summary Stats */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold border-b-2 border-gray-800 w-fit pr-10">
            Summary Stats
          </h2>
          <p>Completed: {stats.completed.toLocaleString("en-US")}</p>
          {stats.watching ? (
            <p>
              Watching:{" "}
              {stats.watching ? stats.watching.toLocaleString("en-US") : 0}
            </p>
          ) : (
            <p>
              Reading:{" "}
              {stats.reading ? stats.reading.toLocaleString("en-US") : 0}
            </p>
          )}
          <p>
            Dropped: {stats.dropped ? stats.dropped.toLocaleString("en-US") : 0}
          </p>
          <p>
            On Hold: {stats.on_hold ? stats.on_hold.toLocaleString("en-US") : 0}
          </p>
          {stats.plan_to_watch ? (
            <p>
              Plan To Watch:{" "}
              {stats.plan_to_watch
                ? stats.plan_to_watch.toLocaleString("en-US")
                : 0}
            </p>
          ) : (
            <p>
              Plan To Read:{" "}
              {stats.plan_to_read
                ? stats.plan_to_read.toLocaleString("en-US")
                : 0}
            </p>
          )}
          <p>Total: {stats.total ? stats.total.toLocaleString("en-US") : 0}</p>
        </div>

        {/* Score Stats */}
        <div>
          <h2 className="font-bold border-b-2 border-gray-800 w-fit pr-10 mb-3">
            Score Stats
          </h2>
          {stats.scores
            .slice()
            .reverse()
            .map((s, index) => (
              <div className="flex gap-2" key={index}>
                <p key={index} className="w-16">
                  {s.score} Stars:
                </p>
                <div
                  className={`bg-blue-500 h-5 dynamic-width max-w-[500px]`}
                  style={{ width: getWidth(s.percentage) }}
                />
                <p>
                  {s.votes ? s.votes.toLocaleString("en-US") + " Votes" : 0}
                </p>
                <p className="text-xs self-end">
                  ({s.percentage ? s.percentage + "%" : "0%"})
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default Statistics;
