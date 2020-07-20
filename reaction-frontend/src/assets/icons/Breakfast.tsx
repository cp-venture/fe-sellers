import React from 'react';
export const Breakfast = ({
  color = 'currentColor',
  width = '18px',
  height = '18px',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 18 18'
    >
      <g data-name='Group 7' fill={color}>
        <path
          data-name='Path 27'
          d='M13.034 14.465c2.98-.12 4.31-1.476 4.31-3.136 0-1.442-1-2.655-3.217-3.028.01-.539.011-1.054.011-1.536H0c0 3.158 0 7.743 2.84 9.935-1.724.131-2.84.342-2.84.577 0 .4 3.163.723 7.067.723s7.066-.323 7.066-.723c0-.236-1.118-.446-2.84-.577a5.965 5.965 0 001.741-2.235zm1.035-4.79c1.243.288 1.465.9 1.451 1.687-.016.9-.276 1.508-1.973 1.712a16.339 16.339 0 00.521-3.4zM1.706 7.862h2.209c-.99 2.922.681 7.542.68 7.542-3.611-2.765-2.889-7.542-2.889-7.542z'
        />
        <path
          data-name='Path 28'
          d='M8.229 4.861c.281-2.545 5.9-1.272 4.729-4.576-.18-.5-.989-.287-.808.222.514 1.449-1.437 1.625-2.432 1.958a2.92 2.92 0 00-2.328 2.4c-.061.534.774.528.839-.004z'
        />
        <path
          data-name='Path 29'
          d='M12.207 3.082a2.924 2.924 0 00-2.439 1.879.419.419 0 00.807.222c.377-1.272 2.047-1.293 3.115-1.6a2.031 2.031 0 001.644-2.346c-.069-.528-.906-.539-.837 0 .195 1.472-1.16 1.579-2.29 1.845z'
        />
      </g>
    </svg>
  );
};
