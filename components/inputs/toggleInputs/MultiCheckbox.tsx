import { CSSProperties, RefObject, useEffect, useState } from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { SelectOption, TriState } from 'morning-react-ui/types/dataTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import { BasicInputProps } from '../propsTypes';
import styles from './multiToggleInputs.module.css';
import Checkbox from './single/Checkbox';

type MultiCheckboxProps = BasicInputProps & {
  options: SelectOption[];
  selectedValues: string[];
  onChange: (newValues: string[]) => void;
  checkboxRefs?: RefObject<HTMLInputElement | null>[];
  inline?: boolean;
  styleCheckbox?: CSSProperties;
  styleMultiCheckbox?: CSSProperties;
  hoveredIndex?: number | null;
  setHoveredIndex?: (index: number | null) => void;
  isSelectAll?: boolean;
  selectAllLabel?: string;
  disabled?: boolean;
  isError?: boolean;
};

const MultiCheckbox = ({
  options,
  selectedValues,
  onChange,
  checkboxRefs,
  size,
  inline = false,
  label,
  sublabel,
  bold,
  styleCheckbox: styleCheckboxProps,
  styleMultiCheckbox,
  hoveredIndex,
  setHoveredIndex,
  isSelectAll = false,
  selectAllLabel = 'Tout sélectionner',
  disabled = false,
  isError = false,
}: MultiCheckboxProps) => {
  const isMobile = useIsMobile();
  const finalSize = size ?? (isMobile ? Size.l : Size.m);

  const [selectAllCheckbox, setSelectAllCheckbox] = useState<TriState>(
    TriState.false,
  );

  useEffect(() => {
    if (!isSelectAll) {
      return;
    }
    if (selectedValues.length === 0) {
      setSelectAllCheckbox(TriState.false);
    } else if (selectedValues.length === options.length) {
      setSelectAllCheckbox(TriState.true);
    } else {
      setSelectAllCheckbox(TriState.indeterminate);
    }
  }, [options, selectedValues, isSelectAll]);

  const handleSelectAllChange = (value: TriState) => {
    if (value === TriState.true) {
      onChange(options.map((o) => o.id));
    } else {
      onChange([]);
    }
  };

  const styleSelectAll = {
    ...styleCheckboxProps,
    ...(hoveredIndex === 0 && { backgroundColor: 'var(--cloud)' }),
  };

  return (
    <ParentInput
      label={label}
      sublabel={sublabel}
      size={finalSize}
      bold={bold}
      disabled={disabled}
    >
      <div
        className={classNames(styles.wrapper, {
          [styles.inline]: inline,
          [styles.column]: !inline,
        })}
        style={styleMultiCheckbox}
      >
        {isSelectAll && (
          <Checkbox
            label={selectAllLabel}
            value={selectAllCheckbox}
            onChange={handleSelectAllChange}
            style={styleSelectAll}
            size={finalSize}
            disabled={disabled}
            isError={isError}
            onMouseMove={() => setHoveredIndex?.(0)}
            ref={checkboxRefs?.[0] ?? null}
            onMouseLeave={() => setHoveredIndex?.(null)}
            className='font-weight-medium'
          />
        )}

        {options.map((opt, index) => {
          const adjustedIndex = isSelectAll ? index + 1 : index;
          const isHovered = adjustedIndex === hoveredIndex;

          const checkboxState = selectedValues.includes(opt.id)
            ? TriState.true
            : TriState.false;

          const handleChange = (newValue: TriState) => {
            if (newValue === TriState.true) {
              onChange([...selectedValues, opt.id]);
            } else {
              onChange(selectedValues.filter((val) => val !== opt.id));
            }
          };

          return (
            <Checkbox
              key={opt.id}
              label={opt.label}
              className={classNames({
                [styles.checkboxHovered]: isHovered,
              })}
              value={checkboxState}
              onChange={handleChange}
              size={finalSize}
              style={styleCheckboxProps}
              disabled={disabled}
              isError={isError}
              onMouseMove={() => setHoveredIndex?.(adjustedIndex)}
              onMouseLeave={() => setHoveredIndex?.(null)}
              ref={checkboxRefs?.[adjustedIndex] ?? null}
              imgSrc={opt.imgSrc}
            />
          );
        })}
      </div>
    </ParentInput>
  );
};

export default MultiCheckbox;
