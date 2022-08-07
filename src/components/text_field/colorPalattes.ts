import {ColorMap} from '~/utils/Colors';

type TextFieldColorPalettes = {
  borderColor: string;
  backgroundColor: string;
};

const primary: TextFieldColorPalettes = {
  borderColor: ColorMap.Primary500,
  backgroundColor: ColorMap.White,
};

const active: TextFieldColorPalettes = {
  borderColor: ColorMap.Primary,
  backgroundColor: ColorMap.White,
};

const inactive: TextFieldColorPalettes = {
  borderColor: ColorMap.Gray300,
  backgroundColor: ColorMap.White,
};

// const disable: TextFieldColorPalettes = {
//   borderColor: ColorMap.Gray300,
//   backgroundColor: ColorMap.White,
// };

const error: TextFieldColorPalettes = {
  borderColor: ColorMap.ErrorMain,
  backgroundColor: ColorMap.ErrorBackground,
};

export type TextInputVariant = 'primary' | 'error' | 'active' | 'inactive';

function getTextInputTheme(key: TextInputVariant): TextFieldColorPalettes {
  switch (key) {
    case 'primary': {
      return primary;
    }
    case 'active': {
      return active;
    }
    case 'inactive': {
      return inactive;
    }
    case 'error': {
      return error;
    }

    default: {
      return primary;
    }
  }
}

export {getTextInputTheme};
