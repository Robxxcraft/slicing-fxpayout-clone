export const formatingUrlBroker = (value: string) => {
  return value.toLowerCase().split(" ").join("-");
};
