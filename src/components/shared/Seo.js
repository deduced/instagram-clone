import React from "react";
import Helmet from "react-helmet";

function SEO({ title }) {
  const TitleText = title ? `${title} · Instagram` : "Instagram";
  return (
    <Helmet>
      <title>{TitleText}</title>
    </Helmet>
  );
}

export default SEO;
