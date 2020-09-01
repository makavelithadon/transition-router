const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { paths, breakpoints } = require("../src/config/index");
const { isDirectory, mkDir, replaceAll } = require("./utils");

const DEST_FOLDER = path.join(paths.images, "build");

const ALLOWED_EXTENSIONS = [
  "svg",
  "jpg",
  "jpeg",
  "png",
  "tiff",
  "raw",
  "gif",
  "webp",
];

function collectImages(base) {
  return fs
    .readdirSync(paths.images)
    .filter((p) => !isDirectory(path.join(paths.images, p)))
    .filter((p) => ALLOWED_EXTENSIONS.includes(getImageExtension(p)))
    .map((n) => path.join(base, n));
}

function getImageExtension(path) {
  return path.includes(".") ? path.slice(path.lastIndexOf(".") + 1) : "";
}

function createResponsiveImages(image) {
  const imageName = image.slice(image.lastIndexOf("/") + 1);
  const reWidth = /\-[0-9]+w/gi;

  if (!reWidth.test(imageName)) return;

  const extension = getImageExtension(image);
  const originaleWidth = Number(
    replaceAll((imageName.match(reWidth) || [""])[0], ["-", ""], ["w", ""])
  );

  if (!originaleWidth) return;

  const widths = [
    ...breakpoints.originalValues.filter(
      (breakpoint) => breakpoint < originaleWidth
    ),
    originaleWidth,
  ];

  if (!isDirectory(DEST_FOLDER)) {
    mkDir(DEST_FOLDER);
  }

  for (width of widths) {
    const destFilename = `${DEST_FOLDER}/${imageName.slice(
      0,
      imageName.indexOf(`-${originaleWidth}w`)
    )}-${width}w.${extension}`;
    sharp(image).resize({ width }).toFile(destFilename);
  }
}

function run() {
  const images = collectImages(paths.images);
  for (const image of images) {
    createResponsiveImages(image);
  }
}

run();
