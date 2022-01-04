import React from "react";

export default function BannerOneHeroHeading({
  title,
  content,
  titleHighlight,
}) {
  console.log(JSON.stringify(titleHighlight, " hey"));
  return (
    <>
      <div className="hero-heading">
        <div className="section-heading">
          <h2 className="sec__title cd-headline zoom">
            {title}
            <span className="cd-words-wrapper">
              {titleHighlight.map((item, index) => {
                return (
                  <b
                    className={item === "Home & Garden" ? "is-visible" : " "}
                    key={index}
                  >
                    {item}
                  </b>
                );
              })}
            </span>
          </h2>
          <p className="sec__desc">{content}</p>
        </div>
      </div>
    </>
  );
}