This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Name Project

Technical test bnc

# Tools

### Framework/Library untuk Frontend:
1. Next.js
2. React Query
3. Axios
4. TypeScript

### State Management:

1. Zustand

### Styling:

1. Tailwind CSS
2. Sass
3. Module SCSS
4. Ant Design (Antd)

### Management Process
1. pm2

# Running

```bash
$ npm run dev
```

With PM2
```bash
$ npm run pm2:start
```

# Explanation

### Folder Arsitecture
- **`src/`**
    - **`app/`**: Directory containing route pages and layout for nextjs.
    - **`assets/`**: Directory to store all static assets such as images, icons, etc.
    - **`components/`**: Directory to store React components used in the application, such as Heading, Input, Label, and others.
    - **`data/`**: Directory to store static data.
    - **`features/`**: Directory to store main features of the application, each feature may have a separate directory structure.
    - **`helpers/`**: Directory to store utilities or helper functions.
    - **`lib/`**: Directory to store libraries or modules used in the project.
    - **`services/`**: Directory to store logic for connecting with backend or external services.
    - **`types/`**: Directory to store type definitions or TypeScript interfaces used in the project.
    - **`ui/`**: Directory to store UI components or UI style modules that are generic and reusable.

### SSR
1. I collaborated my SSR with React Query hydration. For more details, refer to the Next.js SSR with React Query documentation: https://tanstack.com/query/v4/docs/framework/react/guides/ssr

### Translation
1. For the translation, I've already created static data with 'id' and 'en' in each section, stored in the project root directory -> src -> data -> staticPage.ts.

### Header
1. Using a customized antd menu component ref: https://ant.design/components/menu
2. For toggle using antd component switch ref: https://ant.design/components/switch
3. The design of the navbar menu is inspired by the website https://bankneocommerce.co.id/
4. For the responsive navbar menu, I integrated the antd menu component with a drawer. here ref for antd drawer https://ant.design/components/drawer

### List Page
1. For local pagination, I'm using React Query's infinite queries. Reference
2. Add a button for like/unlike using the local storage library Zustand Persist. Reference: https://docs.pmnd.rs/zustand/integrations/persisting-store-data

### Detail Page
1. For creating the popup screen, I'm using React's useState, native javascript for close popup with esc and building basic components with Tailwind to make the screen appear floating.
2. On the detail page, I'm implementing dynamic metadata with data fetched from the movie detail API to optimize SEO metadata. here ref for meta data https://nextjs.org/docs/app/building-your-application/optimizing/metadata

### Favorite Pages
1. The list is retrieved from local storage using the Zustand library.
2. I've already created like and unlike button functions using the Zustand library, all that's left is to apply the trigger in this favorite page feature.
