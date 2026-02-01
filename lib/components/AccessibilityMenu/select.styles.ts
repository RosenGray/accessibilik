import { GroupBase, StylesConfig } from "react-select";

const controlBorder = "#2c2639";
const controlBg = "#f9f9f9";
const controlBgHover = "#f0f0f0";
const accent = "#222e8a";
const accentHover = "#1a2470";
const text = "#2c2639";
const textMuted = "#5a5468";
const dropdownBg = "#fff";
const dropdownBorder = "#e0dde5";
const optionHover = "rgba(44, 38, 57, 0.08)";
const optionSelected = "rgba(34, 46, 138, 0.15)";
const optionSelectedText = "#222e8a";

export const styles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    minWidth: "100%",
    backgroundColor: state.isFocused ? controlBgHover : controlBg,
    borderColor: controlBorder,
    borderWidth: "0.3px",
    borderRadius: 0,
    boxShadow: "none",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
    "&:hover": {
      borderColor: controlBorder,
      backgroundColor: controlBgHover,
    },
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: dropdownBg,
    border: `1px solid ${dropdownBorder}`,
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(44, 38, 57, 0.12)",
    padding: "4px",
    marginTop: "2px",
    zIndex: 100,
  }),

  menuList: (base) => ({
    ...base,
    padding: 0,
    maxHeight: "240px",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? optionSelected
      : state.isFocused
        ? optionHover
        : "transparent",
    color: state.isSelected ? optionSelectedText : text,
    cursor: "pointer",
    padding: "10px 12px",
    borderRadius: "4px",
    fontSize: "15px",
    transition: "background-color 0.1s ease",
    "&:active": {
      backgroundColor: optionSelected,
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: textMuted,
    fontSize: "15px",
  }),

  singleValue: (base) => ({
    ...base,
    color: text,
    fontSize: "15px",
  }),

  input: (base) => ({
    ...base,
    color: text,
    fontSize: "15px",
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: optionSelected,
    borderRadius: "4px",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: optionSelectedText,
    fontSize: "14px",
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: accent,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: accentHover,
      color: "#fff",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    color: textMuted,
    cursor: "pointer",
    padding: "6px",
    "&:hover": {
      color: text,
    },
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: controlBorder,
    cursor: "pointer",
    padding: "6px 8px",
    "&:hover": {
      color: accent,
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: controlBorder,
    width: "0.3px",
  }),

  noOptionsMessage: (base) => ({
    ...base,
    color: textMuted,
    fontSize: "15px",
    padding: "12px",
  }),
};
