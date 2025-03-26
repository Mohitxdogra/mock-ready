export const fromTop = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index ? 0.2 * index : 0,
        duration: 0.2,
        type: "spring",
        stiffness: 10,
        damping: 5,
      },
    }),
  };
  
  export const fromBottom = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index ? 0.2 * index : 0,
        duration: 0.2,
        type: "spring",
        stiffness: 10,
        damping: 5,
      },
    }),
  };
  
  export const fromLeft = {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index ? 0.2 * index : 0,
        duration: 0.2,
        type: "spring",
        stiffness: 10,
        damping: 5,
      },
    }),
  };
  
  export const fromRight = {
    initial: {
      opacity: 0,
      x: 200,
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index ? 0.2 * index : 0,
        duration: 0.2,
        type: "spring",
        stiffness: 10,
        damping: 5,
      },
    }),
  };
  
  export const textReveal = {
    initial: {
      opacity: 0,
    },
    animate: (index: number) => ({
      opacity: 1,
      transition: {
        duration: 0.3 * index,
        delay: index * 0.005,
      },
    }),
  };
  
  export const opacityIn = {
    initial: {
      opacity: 0,
    },
    animate: (index: number) => ({
      opacity: 1,
      transition: {
        delay: index ? 0.2 * index : 0,
        duration: 1.5,
      },
    }),
  };
  