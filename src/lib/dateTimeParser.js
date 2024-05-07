const parseDateTime = (d, options) => {
  let date = new Date(d);
  date = date.toLocaleString(
    "en-US",
    options
      ? options
      : {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
  );
  return date;
};
export default parseDateTime;
export const parseDateTimeGMT = (d, options) => {
  let date = new Date(d);
  date.setHours(date.getHours() - 5); // Subtract 5 hours
  date = date.toLocaleString(
    "en-US",
    options
      ? options
      : {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
  );
  return date;
};
