'use client';
import { Callout } from 'morning-react-ui/components/callout';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { Color, Size } from 'morning-react-ui/utils/Enum';

export default function Page() {
  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Callout</h1>
      </Navigation>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.red}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.blue}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.green}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.yellow}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.gray}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.pink}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.orange}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.purple}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              size={Size.s}
              color={Color.teal}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.red}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.blue}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.green}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.yellow}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.gray}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.pink}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.orange}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.purple}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.teal}
              size={Size.m}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.red}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.blue}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.green}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.yellow}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.gray}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.pink}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.orange}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.purple}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
          <div>
            <Callout
              icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/bulb.svg`}
              color={Color.teal}
              size={Size.l}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              commodo odio tellus.
            </Callout>
          </div>
        </div>
      </div>
    </>
  );
}
