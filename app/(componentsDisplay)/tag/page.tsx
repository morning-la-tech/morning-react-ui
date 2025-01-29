'use client';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import Tag from 'morning-react-ui/components/tag/Tag';
import { Color, Size } from 'morning-react-ui/utils/Enum';

export default function Page() {
  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Tag</h1>
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
            <Tag label='Red Tag' color={Color.red} />
          </div>
          <div>
            <Tag label='Blue Tag' color={Color.blue} />
          </div>
          <div>
            <Tag label='Green Tag' color={Color.green} />
          </div>
          <div>
            <Tag label='Yellow Tag' color={Color.yellow} />
          </div>
          <div>
            <Tag label='🍟 Laffitte' color={Color.gray} />
          </div>
          <div>
            <Tag label='Pink Tag' color={Color.pink} />
          </div>
          <div>
            <Tag label='Orange Tag' color={Color.orange} />
          </div>
          <div>
            <Tag label='Purple Tag' color={Color.purple} />
          </div>
          <div>
            <Tag label='Teal Tag' color={Color.teal} />
          </div>
          <div>
            <Tag label='icon Tag' color={Color.teal} />
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
            <Tag label='Red Tag' color={Color.red} size={Size.m} />
          </div>
          <div>
            <Tag label='Blue Tag' color={Color.blue} size={Size.m} />
          </div>
          <div>
            <Tag label='Green Tag' color={Color.green} size={Size.m} />
          </div>
          <div>
            <Tag label='Yellow Tag' color={Color.yellow} size={Size.m} />
          </div>
          <div>
            <Tag label='⚜️ Saint-Ho' color={Color.gray} size={Size.m} />
          </div>
          <div>
            <Tag label='Pink Tag' color={Color.pink} size={Size.m} />
          </div>
          <div>
            <Tag label='Orange Tag' color={Color.orange} size={Size.m} />
          </div>
          <div>
            <Tag label='Purple Tag' color={Color.purple} size={Size.m} />
          </div>
          <div>
            <Tag label='Teal Tag' color={Color.teal} size={Size.m} />
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
            <Tag label='Red Tag' color={Color.red} size={Size.l} />
          </div>
          <div>
            <Tag label='Blue Tag' color={Color.blue} size={Size.l} />
          </div>
          <div>
            <Tag label='Green Tag' color={Color.green} size={Size.l} />
          </div>
          <div>
            <Tag label='Yellow Tag' color={Color.yellow} size={Size.l} />
          </div>
          <div>
            <Tag label='⛲️ Trévise' color={Color.gray} size={Size.l} />
          </div>
          <div>
            <Tag label='Pink Tag' color={Color.pink} size={Size.l} />
          </div>
          <div>
            <Tag label='Orange Tag' color={Color.orange} size={Size.l} />
          </div>
          <div>
            <Tag label='Purple Tag' color={Color.purple} size={Size.l} />
          </div>
          <div>
            <Tag label='Teal Tag' color={Color.teal} size={Size.l} />
          </div>
        </div>
      </div>
    </>
  );
}
