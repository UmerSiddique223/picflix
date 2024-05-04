import bookmark from "/public/icons/bookmark.svg";
import home from "/public/icons/home.svg";
import addImage from "/public/icons/gallery-add.svg";
import people from "/public/icons/people.svg";
import wallpaper from "/public/icons/wallpaper.svg";

export const sidebarLinks = [
  {
    name: "home",
    route: "/",
    label: "Home",
  },
  {
    name: "home",
    route: "/search",
    label: "Search",
  },
  {
    name: "people",
    route: "/friends",
    label: "Friends",
  },
  {
    name: "bookmark",
    route: "/saved",
    label: "Saved",
  },
  {
    name: "gallery-add",
    route: "/create",
    label: "Create Post",
  },
  {
    name: "wallpaper",
    route: "/profile",
    label: "Profile",
  },
];

export const bottombarLinks = [
  {
    name: "home",
    route: "/",
    label: "Home",
  },
  {
    name: "bookmark",
    route: "/saved",
    label: "Saved",
  },
  {
    name: "gallery-add",
    route: "/create",
    label: "Create Post",
  },
  {
    name: "wallpaper",
    route: "/profile",
    label: "Profile",
  },
];

const getSvgs = (name) => {
  let SvgComponent = null;

  switch (name) {
    case "home":
      SvgComponent = home;
      break;
    case "wallpaper":
      SvgComponent = wallpaper;
      break;
    case "people":
      SvgComponent = people;
      break;
    case "bookmark":
      SvgComponent = bookmark;
      break;
    case "gallery-add":
      SvgComponent = addImage;
      break;
    default:
      break;
  }

  return SvgComponent;
};

export default getSvgs;

export const profilePictureSources = [
  {
    source: "/images/lamp-lights-lantern-wallpaper-preview.jpg",
  },
  {
    source: "/images/post_img1.jpeg",
  },
  {
    source: "/images/maaz_photo.jpg",
  },
];
