"use strict";

/*
  以后新增或修改作品，主要只编辑这个文件。

  Illustration 文件夹规则：
  assets/illustration/ILL-001/cover.jpg
  assets/illustration/ILL-001/final.jpg
  assets/illustration/ILL-001/process-01.jpg

  Projects 文件夹规则：
  assets/projects/PRJ-001/cover.jpg

  如果图片是 PNG 或 WebP，只要把 file 后缀改成实际格式即可。
*/

window.PORTFOLIO_VERSION = "2026-07-16-1";

window.PORTFOLIO_WORKS = {
  illustration: [
    {
      id: "ILL-001",
      title: "",
      year: "2025",
      cover: "ILL-001/cover.jpg",
      ratio: "landscape",
      layout: "one",
      fit: "contain",
      medium: "Digital drawing and collage",
      description: "Replace this description with the final work statement.",
      gallery: [
        { file: "ILL-001/final.jpg", caption: "Final illustration" },
        { file: "ILL-001/process-01.jpg", caption: "Process 01" },
        { file: "ILL-001/process-02.jpg", caption: "Process 02" }
      ]
    },
    {
      id: "ILL-002",
      title: "Material Landscape",
      year: "2025",
      cover: "ILL-002/cover.jpg",
      ratio: "portrait",
      layout: "two",
      fit: "contain",
      medium: "Digital illustration",
      description: "Replace this description with the final work statement.",
      gallery: [
        { file: "ILL-002/final.jpg", caption: "Final illustration" },
        { file: "ILL-002/process-01.jpg", caption: "Process 01" }
      ]
    },
   {
  id: "ILL-003",
  title: "Stop & Look",
  year: "2025",

  previewVideo: "ILL-003/preview.mp4",

  ratio: "square",
  layout: "three",
  fit: "cover",

  medium: "Digital animation",
  description: "Step, Look back, Move, Stop.",

  gallery: [
    {
      type: "youtube",
      youtubeId: "cqJyOxv1dtM",
      caption: ""
    }
  ]
},
    {
  id: "ILL-004",
  title: "くまもんの旅",
  year: "2025",

  previewVideo: "ILL-004/preview.mp4",

  ratio: "square",
  layout: "four",
  fit: "cover",

  medium: "Digital animation",
  description: "旅へ",

  gallery: [
    {
      type: "youtube",
      youtubeId: "ItKRwbIBMCM",
      caption: ""
    }
  ]
},
    {
      id: "ILL-005",
      title: "Sectional Memory",
      year: "2025",
      cover: "ILL-005/cover.jpg",
      ratio: "portrait",
      layout: "five",
      fit: "contain",
      medium: "Drawing",
      description: "Replace this description with the final work statement.",
      gallery: [
        { file: "ILL-005/final.jpg", caption: "Final illustration" }
      ]
    },
    {
      id: "ILL-006",
      title: "Atmospheric Index",
      year: "2024",
      cover: "ILL-006/cover.jpg",
      ratio: "landscape",
      layout: "six",
      fit: "contain",
      medium: "Drawing",
      description: "Replace this description with the final work statement.",
      gallery: [
        { file: "ILL-006/final.jpg", caption: "Final illustration" }
      ]
    }
  ],
  projects: [
    {
      id: "PRJ-001",
      title: "Nottingham Contemporary",
      year: "2026",
      cover: "PRJ-001/cover.jpg",
      ratio: "landscape",
      fit: "cover",
      href: "#"
    },
    {
      id: "PRJ-002",
      title: "Bridge and Movement",
      year: "2026",
      cover: "PRJ-002/cover.jpg",
      ratio: "landscape",
      fit: "cover",
      href: "#"
    },
    {
      id: "PRJ-003",
      title: "Wind Mapping Study",
      year: "2025",
      cover: "PRJ-003/cover.jpg",
      ratio: "portrait",
      fit: "cover",
      href: "#"
    },
    {
      id: "PRJ-004",
      title: "Monobloc Investigation",
      year: "2025",
      cover: "PRJ-004/cover.jpg",
      ratio: "square",
      fit: "cover",
      href: "#"
    }
  ]
};
