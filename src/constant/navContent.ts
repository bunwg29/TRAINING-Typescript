type navigationContent = {
  href: string;
  title: string;
};

export const NAV_CONTENT: navigationContent[] = [
  {
    href: '/',
    title: 'All',
  },
  {
    href: '/paid',
    title: 'Paid',
  },
  {
    href: '/unpaid',
    title: 'Unpaid',
  },
  {
    href: '/overdue',
    title: 'Overdue',
  },
];
