import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
];

export const socialLinks = [
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'email',
    url: `${config.email}`,
    icon: 'email',
  },
  {
    label: 'linkedin',
    url: `${config.linkedin}`,
    icon: 'linkedin',
  },
];
