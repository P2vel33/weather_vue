export default function animationShift(
  whenParam,
  staggerChildrenParam,
  xBegin,
  yBegin,
  durationParam
) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: whenParam,
        staggerChildren: staggerChildrenParam,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, x: [xBegin, 0], y: [yBegin, 0] },
    duration: durationParam === undefined ? 0 : durationParam,
  };
  return { container, item };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // x: -50,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, x: [-50, 0], y: [-50, 0] },
};
