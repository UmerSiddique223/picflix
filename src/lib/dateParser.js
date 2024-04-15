const parseDate = (d, options) => {
  let date = new Date(d);
  date = date.toLocaleDateString("en-US", options ? options : {});
  return date;
};
export default parseDate;
