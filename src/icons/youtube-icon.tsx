export const YoutubeIcon = ({
  width = 100,
  height = 35,
  fill = "none",
}: {
  width?: number;
  height?: number;
  fill?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 445 333"
  >
    <path
      d="M356.993 90.1656C353.764 76.5207 344.253 65.7747 332.173 62.1278C310.283 55.5 222.499 55.5 222.499 55.5C222.499 55.5 134.717 55.5 112.826 62.1278C100.746 65.7747 91.2325 76.5207 88.0063 90.1656C82.1411 114.898 82.1411 166.501 82.1411 166.501C82.1411 166.501 82.1411 218.101 88.0063 242.836C91.2325 256.482 100.746 267.225 112.825 270.876C134.716 277.501 222.498 277.501 222.498 277.501C222.498 277.501 310.282 277.501 332.172 270.876C344.251 267.227 353.763 256.482 356.991 242.837C362.858 218.102 362.858 166.502 362.858 166.502C362.858 166.502 362.858 114.899 356.991 90.167"
      fill="#FF0000"
    />
    <path
      d="M193.79 213.352L267.158 166.503L193.79 119.65V213.352Z"
      fill="white"
    />
  </svg>
);
