export const toastErrorOptions = {
  style: {
    color: "var(--destructive)",
    border: "1px solid var(--destructive)",
  },
  duration: 3000,
  cancel: {
    label: "Cancel",
    onClick: () => {},
  },
  cancelButtonStyle: {
    backgroundColor: "var(--destructive)",
    color: "var(--background)",
  },
};
export const toastSuccessOptions = {
  style: {
    color: "var(--green)",
    border: "1px solid var(--green)",
  },
  duration: 3000,
};
