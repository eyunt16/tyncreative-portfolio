# NovaStream Creative Studio

Welcome to the NovaStream Creative Studio project! This is a futuristic landing page designed with a dark cyberpunk theme, showcasing the creative capabilities of our studio. The project utilizes modern web technologies including React, TypeScript, Vite, Three.js (React Three Fiber), GSAP, and Framer Motion to deliver a visually stunning and interactive experience.

## Features

- **Dark Cyberpunk Theme**: A visually striking design with neon glowing gradients and glassmorphism effects.
- **Blur Glass Effect Navbar**: A sleek navigation bar that enhances the user experience with a modern look.
- **Hero Section**: Engaging large kinetic typography that introduces the studio in a captivating manner.
- **3D Interactive Scene**: An immersive 3D environment created using Three.js, allowing users to interact with various elements.
- **Project Showcase**: Cards that display our projects with smooth animations and transitions.
- **Smooth Parallax Scrolling**: A custom hook that provides a dynamic scrolling experience, making the background elements move at different speeds.
- **Dynamic Cursor**: A unique cursor effect that enhances user interaction throughout the landing page.
- **Cinematic Animations**: Leveraging GSAP and Framer Motion for smooth transitions and effects, ensuring a 60fps experience.

## Getting Started

To get started with the NovaStream Creative Studio project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/eyunt16/NovaStream
   cd NovaStream
   ```

2. **Install Dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   Start the Vite development server:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open your browser and navigate to `http://localhost:3000` to view the landing page.

## Project Structure

The project is organized as follows:

```
NovaStream Creative Studio
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectShowcase.tsx
│   │   └── Cursor.tsx
│   ├── hooks
│   │   └── useParallax.ts
│   ├── scenes
│   │   └── InteractiveScene.tsx
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── animations.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for checking out the NovaStream Creative Studio project! We hope you enjoy exploring our creative work and the technologies that power this landing page.