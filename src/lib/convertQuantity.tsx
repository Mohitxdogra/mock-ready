const convertQuantity = (num: number) => {
    const quantity = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return quantity;
    }
    const unit = [
      { value: 1e3, suffix: "K+" },
      { value: 1e6, suffix: "M+" },
      { value: 1e9, suffix: "B+" },
      { value: 1e12, suffix: "T+" },
      { value: 1e15, suffix: "P+" },
      { value: 1e18, suffix: "E+" },
    ];
  
    let index;
    for (index = unit.length - 1; index > 0; index--) {
      if (num >= unit[index].value) {
        break;
      }
    }
    return (
      (num / unit[index].value)
        .toFixed(2)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + unit[index].suffix
    );
  };
  
  export default convertQuantity;
  