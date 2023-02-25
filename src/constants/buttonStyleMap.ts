export const buttonStyleMap = {
  colorState: {
    default: "#5C5961",
    purple: "#F9F7FA",
    red: "#F9F7FA",
    ghost: "#98959E",
  },
  backColorState: {
    default: "#F9F7FA",
    purple: "#9650FA",
    red: "#F04D51",
    ghost: "#ffffff",
  },
  borderState: {
    default: "0",
    purple: "0",
    red: "0",
    ghost: "1px solid #EAE7EE",
  },
  hoverState: {
    default: "#EAE7EE",
    purple: "#8335F0",
    red: "#D61A20",
    ghost: "#F9F7FA",
  },
  disabledState: {
    default: ``,
    purple: `
      background-color: #f0e6ff;
      pointer-events: none;
    `,
    red: `
      background-color: #ffe6e6;
      pointer-events: none;
    `,
    ghost: `
      border-color: #f2f0f5;
      color: #dbd7e0;
      pointer-events: none;
    `,
  },
};
