import 'react-i18next';
import common_en from './translations/en/common.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common_en';
    resources: {
      common: typeof common_en;
    // ns :string
    };
  };
};