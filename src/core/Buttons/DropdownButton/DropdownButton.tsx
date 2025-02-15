/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../Button';
import { DropdownMenu } from '../../DropdownMenu';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import SvgCaretUpSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretUpSmall';

import { useTheme } from '../../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/button.css';

export type DropdownButtonProps = {
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * Style of the dropdown button.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'default' | 'borderless';
} & Omit<ButtonProps, 'onClick' | 'styleType' | 'endIcon'>;

/**
 * Button that opens a DropdownMenu.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>Item #1</MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>Item #2</MenuItem>,
 * ];
 * <DropdownButton menuItems={menuItems}>Default</DropdownButton>
 */
export const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { menuItems, className, size, styleType, children, ...rest } = props;

  useTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [menuWidth, setMenuWidth] = React.useState(0);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setMenuWidth(ref.current.offsetWidth);
    }
  }, [children, size, styleType]);

  return (
    <DropdownMenu
      menuItems={menuItems}
      style={{ minWidth: menuWidth }}
      onShow={() => setIsMenuOpen(true)}
      onHide={() => setIsMenuOpen(false)}
    >
      <Button
        className={cx('iui-dropdown', className)}
        size={size}
        styleType={styleType}
        endIcon={
          isMenuOpen ? (
            <SvgCaretUpSmall aria-hidden />
          ) : (
            <SvgCaretDownSmall aria-hidden />
          )
        }
        ref={ref}
        aria-label='Dropdown'
        {...rest}
      >
        {children}
      </Button>
    </DropdownMenu>
  );
};

export default DropdownButton;
