const parseDate = (d,options) => {
    console.log(d);
    let date= new Date(d);
    date = date.toLocaleDateString("en-US", options?options:{});
    return date;
};
export default parseDate;