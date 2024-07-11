This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This project was developed for a technical test. It is an application that manages investments, allowing the user to create new investments, see the progress of how much will be accumulated over a certain period, and withdraw amounts.

## Architecture

In the construction of this repository, I separated the application's elements into 4 folders:

- *app*: In this folder, I built and organized the application's screens.
- *components*: I built the screen components here. It is divided into three folders: In the templates folder, you will find components used in more than one screen, such as the InputNumber component that I built with the necessary validations for the application. The other folders are named after the routes of each screen, and in them, I built the specific components used for each.
- *static*: In the "static" folder, you will find the images used in the application.
- *types*: Here, I defined the types that are used in more than one screen and exported them.

## Libraries and tools

- *Cache*: To handle the cache, I used the emotion/cache library, which is well integrated with Next.js. It helps me store some information in cache to optimize page loading, such as the images used.
- *Cookies*: I used the Cookies-js library to help ensure that data is not lost when reloading pages.
- *Styles and components*: I did use the MaterialUI library and its related libraries for styling and componentization of the application.
- *Graphs*: For plotting the charts, I used the ApexCharts library, which provides interactive, intuitive, and easily customizable charts.
- *Tests*: I used Jest to build the automated tests for the application.

## Getting Started

First, install the libraries:

```bash
npm install
#or
yarn install
#or
pnpm install
```

After that, use one of the commands below to run the application. It will run on port 3000.

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
