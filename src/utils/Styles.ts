import {css} from 'styled-components/native';

import {ColorMap} from './Colors';

export const TitleStyle = css`
  color: ${ColorMap.LightBlue2};
  font-weight: 600;
  font-size: 28px;
`;

export const SubtitleStyle = css`
  color: ${ColorMap.LightBlue2};
  font-weight: 400;
  font-size: 14px;
`;

export const ContainerStyle = css`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
