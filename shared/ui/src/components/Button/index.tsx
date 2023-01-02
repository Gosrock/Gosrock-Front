import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import { ButtonHTMLAttributes } from 'react';
import { theme } from '../../theme';

type ButtonSize = 'fill' | 'fixed';
type ButtonVarient =
  | 'primary'
  | 'secondary'
  | 'selected'
  | 'unselected'
  | 'alert'
  | 'kakao';

/**
 * @param types 버튼의 종류 :  'primary' | 'secondary' | 'selected' | 'unselected' | 'alert' | 'kakao';
 * @param size 버튼의 사이즈 : 화면에 꽉차게 / 크기 고정
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  varient?: ButtonVarient;
  size?: ButtonSize;
}

const TEXT_COLOR = {
  normal: {
    primary: `${theme.palette.mono.white}`,
    secondary: `${theme.palette.main.violet_500}`,
    selected: `${theme.palette.mono.white}`,
    unselected: `${theme.palette.main.violet_500}`,
    alert: `${theme.palette.mono.white}`,
    kakao: `${theme.palette.mono.gray_500}`,
  },
};

const BUTTON_COLOR = {
  normal: {
    primary: `${theme.palette.main.violet_400}`,
    secondary: `${theme.palette.main.violet_200}`,
    selected: `${theme.palette.main.violet_300}`,
    unselected: `transparent`,
    alert: `${theme.palette.semantic.red_200}`,
    kakao: `#FFEB00`,
  },
  hover: {
    primary: `${darken(0.01, theme.palette.main.violet_400)}`,
    secondary: `${darken(0.01, theme.palette.main.violet_200)}`,
    selected: `${darken(0.01, theme.palette.main.violet_300)}`,
    unselected: `transparent`,
    alert: `${darken(0.01, theme.palette.semantic.red_200)}`,
    kakao: `${darken(0.01, '#FFEB00')}`,
  },
  active: {
    primary: `${darken(0.03, theme.palette.main.violet_400)}`,
    secondary: `${darken(0.03, theme.palette.main.violet_200)}`,
    selected: `${darken(0.03, theme.palette.main.violet_300)}`,
    unselected: `transparent`,
    alert: `${darken(0.03, theme.palette.semantic.red_200)}`,
    kakao: `${darken(0.03, '#FFEB00')}`,
  },
  disabled: {
    primary: `${theme.palette.mono.gray_200}`,
    secondary: `${theme.palette.mono.gray_200}`,
    selected: `${theme.palette.mono.gray_200}`,
    unselected: `${theme.palette.mono.gray_200}`,
    alert: `${theme.palette.mono.gray_200}`,
    kakao: `${theme.palette.mono.gray_200}`,
  },
};

export const Button = ({
  children,
  varient = 'primary',
  size = 'fill',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton varient={varient} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  varient: ButtonVarient;
  size: ButtonSize;
}>`
  height: 56px;
  border-radius: 16px;
  width: ${({ size }) => (size === 'fill' ? '100%' : '158px')};
  ${({ theme }) => theme.typo.Text.Text_18}

  background-color : ${({ varient }) => BUTTON_COLOR.normal[varient]};
  ${({ theme, varient }) =>
    varient === 'unselected' &&
    css`
      border: 2px solid ${theme.palette.main.violet_300};
    `}

  color: ${({ varient }) => TEXT_COLOR.normal[varient]};

  &:hover {
    background-color: ${({ varient }) => BUTTON_COLOR.hover[varient]};
  }
  &:active {
    background-color: ${({ varient }) => BUTTON_COLOR.active[varient]};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.mono.white} !important;
    background-color: ${({ varient }) =>
      BUTTON_COLOR.disabled[varient]} !important;
    border: none;
  }
`;
