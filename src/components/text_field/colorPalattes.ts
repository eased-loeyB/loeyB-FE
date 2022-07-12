import {
  CommonColors,
  ErrorColors,
  GrayColors,
  PrimaryColors,
  TextColors,
} from '~/utils/Colors';

type TextFieldColorPalettes = {
  borderColor: string;
  backgroundColor: string;
};

const primary: TextFieldColorPalettes = {
  borderColor: PrimaryColors.Primary500,
  backgroundColor: CommonColors.White,
};

const active: TextFieldColorPalettes = {
  borderColor: TextColors.Primary,
  backgroundColor: CommonColors.White,
};

const inactive: TextFieldColorPalettes = {
  borderColor: GrayColors.Gray300,
  backgroundColor: CommonColors.White,
};

// const disable: TextFieldColorPalettes = {
//   borderColor: GrayColors.Gray300,
//   backgroundColor: CommonColors.White,
// };

const error: TextFieldColorPalettes = {
  borderColor: ErrorColors.Main,
  backgroundColor: ErrorColors.Background,
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
