interface Props {
  color?: boolean;
}

const Bug = ({ color }: Props) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9997 20.7905C12.829 20.7905 12.66 20.7568 12.5022 20.6915C12.3445 20.6262 12.2012 20.5304 12.0805 20.4097C11.9598 20.289 11.864 20.1457 11.7987 19.988C11.7333 19.8302 11.6997 19.6612 11.6997 19.4905C11.6997 19.3197 11.7333 19.1507 11.7987 18.993C11.864 18.8353 11.9598 18.6919 12.0805 18.5712C12.2012 18.4505 12.3445 18.3548 12.5022 18.2894C12.66 18.2241 12.829 18.1905 12.9997 18.1905C13.3445 18.1905 13.6752 18.3274 13.919 18.5712C14.1628 18.815 14.2997 19.1457 14.2997 19.4905C14.2997 19.8352 14.1628 20.1659 13.919 20.4097C13.6752 20.6535 13.3445 20.7905 12.9997 20.7905ZM11.9164 9.97555C11.9164 9.68823 12.0305 9.41268 12.2337 9.20952C12.4368 9.00635 12.7124 8.89222 12.9997 8.89222C13.287 8.89222 13.5626 9.00635 13.7657 9.20952C13.9689 9.41268 14.083 9.68823 14.083 9.97555V15.3922C14.083 15.6795 13.9689 15.9551 13.7657 16.1582C13.5626 16.3614 13.287 16.4755 12.9997 16.4755C12.7124 16.4755 12.4368 16.3614 12.2337 16.1582C12.0305 15.9551 11.9164 15.6795 11.9164 15.3922V9.97555ZM24.8232 20.3831L15.252 3.80488C14.251 2.07155 11.7485 2.07155 10.7475 3.80488L1.17622 20.3831C0.176299 22.1165 1.42538 24.2831 3.42847 24.2831H22.571C24.573 24.2831 25.8231 22.1165 24.8232 20.3831Z"
        fill={color ? "#F9F7FA" : "#1F1E21"}
      />
    </svg>
  );
};

export default Bug;