'use client';

import { type ReactElement } from 'react';

const ControlPanelItems = (props: { innerText: string }): ReactElement => {
  return (
    <div className="tracking-[-3px] font-[Bittypix] text-[31px] text-[#ff0000] bg-black p-[3px] leading-[normal] relative">
      <div className="flex gap-[3px]">
        {props.innerText
          .toString()
          .split('')
          .map((letter, index) => (
            <p key={index}>{letter}</p>
          ))}
      </div>

      <div className="flex gap-[3px] absolute left-[3px] top-[3px] opacity-50">
        {Array(3)
          .fill(8)
          .map((letter, index) => (
            <p
              className="[mask-image:url('/images/letter-mask.png')] [mask-repeat:no-repeat] [mask-size:cover] [mask-position:center]"
              key={index}
            >
              {letter}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ControlPanelItems;
