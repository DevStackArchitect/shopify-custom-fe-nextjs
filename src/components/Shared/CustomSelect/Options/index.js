import {useState} from 'react';
import {components} from 'react-select';
import * as styles from './styles.module.scss';

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = 'transparent';
  if (isFocused) bg = '#eee';
  if (isActive) bg = '#F6D5D5';

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex ',
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      {rest.isMulti && (
        <input type="checkbox" checked={isSelected} className={styles.checkbox}  />
      )}
      {children}
    </components.Option>
  );
};

export default InputOption;
