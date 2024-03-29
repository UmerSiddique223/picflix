import bookmark from "./assets/bookmark.svg";
import home from "./assets/home.svg";
import addImage from "./assets/gallery-add.svg";
import people from "./assets/people.svg";
import wallpaper from "./assets/wallpaper.svg";


export const sidebarLinks = [
  {
    name: "home",
    route: "/",
    label: "Home",
  },
  {
    name: "wallpaper",
    route: "/explore",
    label: "Explore",
  },
  {
    name: "people",
    route: "/all-users",
    label: "People",
  },
  {
    name: "bookmark",
    route: "/saved",
    label: "Saved",
  },
  {
    name: "gallery-add",
    route: "/create-post",
    label: "Create Post",
  },
];
  
export const  bottombarLinks = [
  {
    name: "home",
    route: "/",
    label: "Home",
  },
  {
    name: "wallpaper",
    route: "/explore",
    label: "Explore",
  },
  {
    name: "bookmark",
    route: "/saved",
    label: "Saved",
  },
  {
    name: "gallery-add",
    route: "/create-post",
    label: "Create Post",
  },
];

  const getSvgs = (name) => {
    let SvgComponent = null;
  
    switch (name) {
      case "home":
        SvgComponent=home;
        break;
      case "wallpaper":
        SvgComponent=wallpaper;
        break;
      case "people":
        SvgComponent=people;
      break;
      case "bookmark":
        SvgComponent=bookmark;
        break;
      case "gallery-add":
        SvgComponent=addImage;
      break;
      default:
        break;
    }
  
    return SvgComponent;
  };
  
  export default getSvgs;
  