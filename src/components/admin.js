import React from "react";
import { Link } from "react-router-dom";
// import React, { useState, useEffect, useContext } from "react";

export default function Admin() {
  return (
    <>
      <Link to="/addProduct">
        <button>პროდუქტის დამატება</button>
      </Link>
    </>
  );
}
