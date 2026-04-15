export const FocusCircle = () => {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="focus-circle-SVG"
    >
      <circle id="Ellipse 16" cx="36" cy="36" r="35" stroke="var(--secondary-accent-color)" />
    </svg>
  );
};

export const HabitCircle = ({ style }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="habit-circle-SVG"
    >
      <circle cx="10" cy="10" r="10" style={style} />
    </svg>
  );
};

export const BreathCircle = () => {
  return (
    <svg
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="breath-circle-SVG"
    >
      <circle id="Ellipse 9" cx="35" cy="35" r="35" fill="var(--secondary-accent-color)" />
    </svg>
  );
};

export const MoodStableLine = () => {
  return (
    <svg
      viewBox="0 0 91 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mood-stable-SVG"
    >
      <path
        d="M3 3L88 3"
        stroke="var(--secondary-accent-color)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const MoodUp = () => {
  return (
    <svg
      viewBox="0 0 91 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mood-up-SVG"
    >
      <path
        d="M3 46L45.4264 3.57359L87.8528 46"
        stroke="var(--primary-accent-color)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const MoodDown = () => {
  return (
    <svg
      viewBox="0 0 91 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mood-down-SVG"
    >
      <path
        d="M87.8528 3.42639L45.4264 45.8528L3 3.42639"
        stroke="var(--primary-accent-color)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const DashLine = () => {
  return (
    <svg
      viewBox="0 0 282 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="line-dashboard"
    >
      <path
        d="M1 1.5H281"
        stroke="var(--primary-accent-color)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ResetIcon = () => {
  return (
    <svg
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
      className="reset-icon"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="var(--primary-accent-color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(0 1 1 0 2.5 2.5)"
      >
        <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />

        <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)" />
      </g>
    </svg>
  );
};
