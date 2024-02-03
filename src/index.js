import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import "./index.css";
import App from "./App";
import Appocr from "./Appocr";

const root = createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ocr" element={<Appocr />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
