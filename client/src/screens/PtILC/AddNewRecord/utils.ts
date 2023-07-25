export const generateParametersChips = (data=[], onSelectionChange) => {
    let chips = [];
    chips = data?.map(el => {
        return {
            title: el,
            handleClick: onSelectionChange,
        }
    })
    return chips;   
  }