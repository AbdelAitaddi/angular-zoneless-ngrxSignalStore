export const Icons = {
  back: 'arrow_back',
  realEstate: 'real_estate_agent',
  favorite: 'favorite',
  heartPlus: 'heart_plus',
  heartMinus: 'heart_minus',
  heartCheck: 'heart_check',
  volunteerActivism: 'volunteer_activism',
  locationCity: 'location_city',
  info: 'info',
  language: 'language',
  menu: 'menu',
  close: 'close',
  enter: 'enter',
} as const;

export type IconTypes = Record<keyof typeof Icons, (typeof Icons)[keyof typeof Icons]>;
