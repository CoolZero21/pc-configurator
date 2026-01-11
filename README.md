# PC Configurator

A modern, interactive 3D PC building simulator built with React and Three.js. This project allows users to customize and visualize PC components in real-time, compare specs, and save configurations.

## Features

- **3D Visualization**: Interactive 3D model of a PC case with component popups.
- **Component Selection**: Choose from CPUs, GPUs, RAM, Motherboards, and PSUs with real data.
- **Filtering & Comparison**: Filter components by specs and compare multiple items side-by-side.
- **Save & Export**: Save configurations to localStorage and export PC images as JPEG.
- **Responsive Design**: Optimized for desktop with smooth animations and particle effects.

## Technologies Used

- **Frontend**: React 19, Vite
- **3D Graphics**: Three.js (@react-three/fiber, @react-three/drei)
- **Styling**: SCSS
- **Icons**: React Icons
- **Utilities**: html-to-image, tsparticles
- **Linting**: ESLint with React rules

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pc-configurator.git
   cd pc-configurator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # React components (Menu, PC, etc.)
├── contexts/            # React contexts for state management
├── config/              # Component configurations
├── utils/               # Utility functions (localStorage)
├── sass/                # SCSS styles
└── assets/              # Static assets

public/
├── database/            # JSON data for components
└── logos/               # Component logos
```

## Usage

1. Click "BUILD" to start.
2. Select components from the menu (CPU, GPU, etc.).
3. Use filters to narrow down options.
4. Click on 3D model parts to change component.
5. Compare components or save your build.

## Contributing

This is a learning project. Feel free to fork and experiment!

## License

MIT License - see [LICENSE](LICENSE) for details.
