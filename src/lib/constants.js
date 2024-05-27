import bookmark from "/public/icons/bookmark.svg";
import home from "/public/icons/home.svg";
import addImage from "/public/icons/gallery-add.svg";
import people from "/public/icons/people.svg";
import wallpaper from "/public/icons/wallpaper.svg";
import search from "/public/icons/search_iconforbar.svg";
import chat from "/public/icons/chat.svg";
import profile from "/public/icons/profile.svg";

export const sidebarLinks = [
  {
    name: "home",
    route: "/",
    label: "Home",
  },
  {
    name: "search",
    route: "/search",
    label: "Search",
  },
  {
    name: "chat",
    route: "/chat",
    label: "Chat",
  },
  {
    name: "gallery-add",
    route: "/create",
    label: "Create Post",
  },
  {
    name: "profile",
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
    name: "search",
    route: "/search",
    label: "Search",
  },
  {
    name: "chat",
    route: "/chat",
    label: "Chat",
  },
  {
    name: "profile",
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
    case "search":
      SvgComponent = search;
      break;
    case "chat":
      SvgComponent = chat;
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
    case "profile":
      SvgComponent = profile;
      break;
    default:
      break;
  }

  return SvgComponent;
};
export const navLinks = [
  {
    name: "bookmark",
    route: "/saved",
    label: "Saved Posts",
  },
  {
    name: "gallery-add",
    route: "/create",
    label: "Create Post",
  },
  {
    name: "people",
    route: "/chat",
    label: "Chat",
  },
  {
    name: "",
    route: "/explore",
    label: "Explore",
  },
];

export default getSvgs;
