'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, ButtonVariant } from '@/components/buttons';
import buttonStyles from '@/components/buttons/button.module.css';
import { Size, sizeToNumber } from '@/util/Enum';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';

export default function Page() {
  const handleClick = () => {
    alert('yeah');
  };

  const getImage = (size: Size) => (
    <Image
      className={buttonStyles.image}
      src='https://cdn.morning.fr/logos/logo_google.png'
      alt='Google logo'
      width={sizeToNumber(size)}
      height={sizeToNumber(size)}
    />
  );

  // eslint-disable-next-line complexity
  const renderButtons = (
    props: {
      isLoading?: boolean;
      className?: string;
      variant?: ButtonVariant;
      disabled?: boolean;
    },
    hasStartImage: undefined | true = undefined,
    hasEndImage: undefined | true = undefined,
    content = <>Button</>,
  ) => {
    return (
      <>
        <Button
          onClick={handleClick}
          {...props}
          startImage={hasStartImage && getImage(Size.m)}
          endImage={hasEndImage && getImage(Size.m)}
        >
          {content}
        </Button>
        <Button
          onClick={handleClick}
          {...props}
          startImage={hasStartImage && getImage(Size.l)}
          endImage={hasEndImage && getImage(Size.l)}
          size={Size.l}
        >
          {content}
        </Button>
        <Button
          onClick={handleClick}
          {...props}
          startImage={hasStartImage && getImage(Size.m)}
          endImage={hasEndImage && getImage(Size.m)}
          size={Size.m}
        >
          {content}
        </Button>
        <Button
          onClick={handleClick}
          {...props}
          startImage={hasStartImage && getImage(Size.s)}
          endImage={hasEndImage && getImage(Size.s)}
          size={Size.s}
        >
          {content}
        </Button>
        <Button
          onClick={handleClick}
          {...props}
          startImage={hasStartImage && getImage(Size.xs)}
          endImage={hasEndImage && getImage(Size.xs)}
          size={Size.xs}
        >
          {content}
        </Button>
      </>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <h1>Buttons</h1>
        <Columns>
          <Column>
            {renderButtons({})}
            {renderButtons({}, true)}
            {renderButtons({}, true, true)}
            {renderButtons({}, true, undefined, <></>)}
            {renderButtons({ isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ className: buttonStyles.hover })}
            {renderButtons({ className: buttonStyles.hover }, true)}
            {renderButtons({ className: buttonStyles.hover }, true, true)}
            {renderButtons({ className: buttonStyles.hover }, true, undefined, <></>)}
            {renderButtons({ className: buttonStyles.hover, isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ className: buttonStyles.active })}
            {renderButtons({ className: buttonStyles.active }, true)}
            {renderButtons({ className: buttonStyles.active }, true, true)}
            {renderButtons({ className: buttonStyles.active }, true, undefined, <></>)}
            {renderButtons({ className: buttonStyles.active, isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ disabled: true })}
            {renderButtons({ disabled: true }, true)}
            {renderButtons({ disabled: true }, true, true)}
            {renderButtons({ disabled: true }, true, undefined, <></>)}
            {renderButtons({ disabled: true, isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ variant: ButtonVariant.Secondary })}
            {renderButtons({ variant: ButtonVariant.Secondary }, true)}
            {renderButtons({ variant: ButtonVariant.Secondary }, true, true)}
            {renderButtons({ variant: ButtonVariant.Secondary }, true, undefined, <></>)}
            {renderButtons({ variant: ButtonVariant.Secondary, isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.hover })}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.hover }, true)}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.hover }, true, true)}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.hover }, true, undefined, <></>)}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.hover, isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.active })}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.active }, true)}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.active }, true, true)}
            {renderButtons(
              { variant: ButtonVariant.Secondary, className: buttonStyles.active },
              true,
              undefined,
              <></>,
            )}
            {renderButtons({ variant: ButtonVariant.Secondary, className: buttonStyles.active, isLoading: true })}
          </Column>
          <Column>
            {renderButtons({ variant: ButtonVariant.Secondary, disabled: true })}
            {renderButtons({ variant: ButtonVariant.Secondary, disabled: true }, true)}
            {renderButtons({ variant: ButtonVariant.Secondary, disabled: true }, true, true)}
            {renderButtons({ variant: ButtonVariant.Secondary, disabled: true }, true, undefined, <></>)}
            {renderButtons({ variant: ButtonVariant.Secondary, disabled: true, isLoading: true })}
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
