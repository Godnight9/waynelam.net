import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  {
    text: 'Home',
    icon: 'fluent:home-24-regular',
    link: '/',
  },
  {
    text: 'Blog',
    icon: 'fluent:calligraphy-pen-24-regular',
    items: [
      {
        text: 'Articles',
        icon: 'fluent:document-one-page-24-regular',
        link: '/blog/',
      },
      {
        text: 'Tags',
        icon: 'fluent:tag-24-regular',
        link: '/blog/tags/',
      },
      {
        text: 'Categories',
        icon: 'fluent:folder-24-regular',
        link: '/blog/categories/',
      },
      {
        text: 'Archives',
        icon: 'fluent:archive-24-regular',
        link: '/blog/archives/',
      },
    ],
  },
  {
    text: 'Notes',
    icon: 'fluent:book-open-24-regular',
    items: [
      {
        text: 'Demo',
        link: '/notes/demo/README.md',
      },
      {
        text: 'Vuepress',
        link: '/notes/vuepress/README.md',
      },
    ],
  },
  {
    text: 'To-Do',
    icon: 'fluent:clipboard-task-list-24-regular',
    link: '/todo/',
  },
  {
    text: 'Discussions',
    icon: 'fluent:chat-multiple-24-regular',
    link: '/discussions/',
  },
])
