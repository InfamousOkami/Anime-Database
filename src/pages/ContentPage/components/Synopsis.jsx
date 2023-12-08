import React from "react";

function Synopsis({ synopsis }) {
  return (
    <div className=" text-sm bg-slate-50 p-3 rounded-lg flex flex-col gap-5">
      <div>
        <h2 className="border-b-2 border-gray-800 font-bold text-md mb-2">
          Synopsis
        </h2>
        <p>
          {synopsis.split("\n").map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Synopsis;
