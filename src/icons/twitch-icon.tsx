export const TwitchIcon = ({
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
    viewBox="0 0 245 245"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.8203 0L5.35938 42.052V213.916H63.8684V245H96.7788L127.863 213.916H175.401L239.392 149.925V0H21.8203ZM217.453 138.961L180.879 175.52H122.374L91.2893 206.604V175.52H41.9256V21.9352H217.445V138.961H217.453ZM180.879 63.9909V127.982H158.944V63.9909H180.879ZM122.37 63.9909V127.982H100.435V63.9909H122.37Z"
      fill="#6441A4"
    />
  </svg>
);
