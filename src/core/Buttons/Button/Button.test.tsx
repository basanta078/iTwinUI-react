/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import SvgPlaceholder from '@itwin/itwinui-icons-react/cjs/icons/Placeholder';
import { Button } from './Button';

it('renders default button correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <Button onClick={onClickMock}>Click me!</Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  expect(onClickMock).toHaveBeenCalled();

  const label = container.querySelector('.iui-label') as HTMLSpanElement;
  expect(label.textContent).toEqual('Click me!');
});

it('renders cta button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='cta' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-button.iui-cta',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('renders high-visibility button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='high-visibility' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-button.iui-high-visibility',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('takes className and style', () => {
  const { container, getByText } = render(
    <Button
      styleType='high-visibility'
      className='my-button'
      style={{ minWidth: 80 }}
    >
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-button.iui-high-visibility.my-button',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.style.minWidth).toBe('80px');
  getByText('Click me!');
});

it('renders small cta correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='cta' size='small' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-button.iui-cta.iui-small',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('renders large high-visibility correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='high-visibility' size='large' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-button.iui-high-visibility.iui-large',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('should render borderless button', () => {
  const { container } = render(
    <Button styleType='borderless'>Click me!</Button>,
  );

  const button = container.querySelector(
    '.iui-button.iui-borderless',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.textContent).toBe('Click me!');
});

it('should render with icon correctly', () => {
  const { container } = render(
    <Button startIcon={<SvgPlaceholder />}>Click me!</Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-icon' />);
  expect(container.querySelector('.iui-icon')).toEqual(placeholderIcon);

  const label = container.querySelector('.iui-icon + .iui-label')?.textContent;
  expect(label).toEqual('Click me!');
});
