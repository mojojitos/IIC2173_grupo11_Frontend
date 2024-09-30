# Replicación Pipe CI - GithubActions Frontend

1. Instalar ESLint en la raíz del repositorio IIC2173_grupo11_Frontend usando el comando ```npm install eslint``` y ```npx eslint --init```. Como no se especifica nada en particular en el enunciado, solo se seleccionó la opción de que ESLint revisara errores de syntaxis para Node.js del código del repositorio.

2. En la pagina del repositorio en github, en la pestaña Actions, seleccionar la plantilla para el workflow para Node.js. Esto genera la carpeta .github/workflows.

3. Luego se debe editar el archivo  .github/workflows/ci.yml eliminando la sección que comienza con matrix: actions/setup-node@v2, ya que eso podría generar problemas de compatibilidad de versiones. La parte sección ```on``` dejarla tal como esta.

4. Crear 1 job para el build, en el cual se establece la versión de node que se esta usando, se instalan las dependencias del projecto, se ejecuta ESLint y se ejecuta la build. Debe tener la siguiente estructura:  
```
jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name:  Check out code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20' 

      - name: Install dependencies
        run: npm install

      - name: Run ESLint
        run: npx eslint 'src/**/*.{js,jsx}'

      - name: Build project
        run: npm run build

      - name: Run Lighthouse CI
        run: npx lhci autorun
```

6. Si no hay conflictos en el workflow, entonces se debería añadir el nuevo código a la rama main del repositorio.