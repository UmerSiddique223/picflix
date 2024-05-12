import "@/utils/loader.css";
export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="loader">
        <div className="circle"></div>
      </div>
    </div>
  );
}
