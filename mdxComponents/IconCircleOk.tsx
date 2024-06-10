type Props = React.SVGAttributes<SVGElement>;

const IconCircleOk = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      fill="#fff"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="11" />
      <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    </svg>
  );
};

export default IconCircleOk;

{
  /* <IconCircleOk
  style={{ marginRight: "0.5rem" }}
  fill="#e0f2fe"
  stroke="#0ea5e9"
  height="1rem"
  width="1rem"
/>; */
}
