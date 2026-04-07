import React from "react";

function EmptyPage({ title }) {
  return (
    <div>
      <h1>{title || "Page Under Construction"}</h1>
      <p>This page is not implemented yet. Check back later!</p>
    </div>
  );
}

export default EmptyPage;
